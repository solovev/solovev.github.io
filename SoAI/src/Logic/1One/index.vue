<template>
  <div class="one flex-row-center flex-start">
    <div class="right-column flex-column-center flex-no-shrink" :style="{ flexBasis: '325px' }">
      <Group v-if="points.length" name="Dashboard" >
        <div class="flex-column-center flex-content-start flex-start">
        <div>Determinated points: {{ determinatedPoints.length }}<span class="il">&nbsp;of {{ points.length }}</span></div>
        <div>Type variation: {{ typeVariation }}<span class="il">&nbsp;of {{ types.length - 1 }}</span></div>
        <div>Current iteration: {{ currentIt }}<span class="il">&nbsp;of {{ iterations }}</span></div>
        <div v-if="typeVariation > 1">Classification type: {{ typeVariation == 2 ? 'Binary' : 'OVA' }}</div>
        <div v-if="typeVariation > 1" class="flex-row-center flex-content-end" style="margin-top: 10px;">
          <button @click="clear" :class="{ 'disabled': learning }" class="default">Clear</button>
          <button @click="learning = !learning" :class="[learning ? 'default' : 'primary']" style="margin: 0 10px">{{ learning ? 'Stop' : 'Start' }} learning</button>
          <CheckBox v-model="untilReps" label="Carelessly" />
        </div>
        </div>
      </Group>
      <Group :disabled="learning" v-if="typeVariation > 1" name="Controls">
        <div class="flex-column-center">
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Learning speed factor' }">Rate</div> <Slider :min="0" :max="1.0" :step="0.01" v-model="speed" />
          </div>
          <div class="flex-row-center">
            <div class="label">Bias</div> <Slider :min="-max" :max="max" :step="0.1" v-model="bias" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Learning iterations' }">Sets</div> <Slider :min="10" :max="10000" v-model="iterations" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Delay between learning steps' }">Delay</div> <Slider :min="0" :max="1000" :step="1" v-model="delay" />
          </div>
        </div>
      </Group>
      <Group v-if="pairs.length > 0" :name="`Pairs (${pairs.length})`">
        <div class="flex-column-center flex-start" style="flex: 1">
          <PairsViewer :types="types" :pairs="pairs" />
          <div class="flex-row-center" style="align-self: center; margin-top: 10px;">
            <button @click="clear" class="default" style="margin: 0 10px">Clear weights</button>
          </div>
        </div>
      </Group>
    </div>
    <Group :name="`Space (${learning ? 'Learning...' : 'Standby'})`">
      <Grid @clickAt="handleGridClick" :max="max" :step="8" :activePoints="points" />
    </Group>
    <div class="right-column selector flex-column-center flex-no-grow">
      <Group :disabled="learning" v-if="types.length" :name="`Types (${types.length - 1})`">
        <TypePicker v-model="activeType" :types="types" />
      </Group>

      <Group :disabled="learning" v-if="determinatedPoints.length" :name="`Points (${determinatedPoints.length})`" >
        <div class="flex-column-center flex-start" style="flex: 1">
          <div class="flex-row-center flex-content-start">
            <PointLabel v-for="p in determinatedPoints" :key="p.created" :p="p" :click="handleGridClick" />
          </div>
          <div class="flex-row-center" style="align-self: center; margin-top: 10px;">
            <button @click="clearPoints" class="default" style="margin: 0 10px">Remove all</button>
          </div>
        </div>
      </Group>

      <Group :disabled="learning || this.pairs.length === 0" :name="`Test points (${unknownPoints.length})`" >
        <div class="flex-column-center flex-start" style="flex: 1">
          <div class="flex-row-center flex-content-start">
            <PointLabel v-for="p in unknownPoints" :key="p.created" :p="p" :click="handleGridClick" />
          </div>
          <div class="flex-row-center" style="align-self: center; margin-top: 10px;">
            <button @click="solve" :class="[auto || unknownPoints.length === 0 ? 'disabled' : 'primary']" style="margin: 0 10px">Solve</button>
            <CheckBox v-model="auto" label="Auto" />
          </div>
        </div>
      </Group>
    </div>
  </div>
</template>

<script>
import Grid from '@/UI/Grid/'
import Group from '@/UI/Group/'
import TypePicker from '@/UI/TypePicker'
import PointLabel from '@/UI/PointLabel'
import Slider from '@/UI/Slider'
import CheckBox from '@/UI/CheckBox'
import PairsViewer from './PairsViewer'

import Point from '../Common/Point'

import NNMixin from './NNMixin'

export default {
  name: 'one',
  mixins: [NNMixin],
  components: {
    Grid, Group, TypePicker, PointLabel, Slider, PairsViewer, CheckBox
  },
  watch: {
    learning (value) {
      if (!value) {
        this.activeType = this.types.length - 1
        return
      }

      this.startLearn(() => {
        this.learning = false
      })
    },
    auto (value) {
      value && this.solve()
    },
    unknownPoints (cur, pre) {
      if (!this.auto) return

      if (cur.length <= pre.length) return
      
      this.solve()
    }
  },
  beforeCreate () {
    this.max = 3
  },
  data () {
    return {
      learning: false,
      untilReps: true,
      auto: false,

      types: ['#2c3e50', '#ff6b81', '#3498db', '#2ecc71', '?'],
      activeType: 0,
      points: [],
      delay: 120,

      speed: 1,
      bias: 0,
      iterations: 1500,
      currentIt: 0
    }
  },
  computed: {
    usedTypes () {
      const temp = {}
      const result = []
      this.determinatedPoints.forEach(point => {
        const { type } = point
        if (!temp[type]) {
          result.push(type)
          temp[type] = true
        }
      })
      return result
    },
    typeVariation() {
      return this.usedTypes.length
    },
    determinatedPoints () {
      return this.points.filter(point => point.color !== '?')
    },
    unknownPoints () {
      return this.points.filter(point => point.color === '?')
    }
  },
  created () {
    const uknown = this.types.length - 1
    this.points = [
      new Point(-1, -1, uknown, this.types[uknown]),
      new Point(0, 0, uknown, this.types[uknown]),
      new Point(1, 1, uknown, this.types[uknown]),

      new Point(-0.7, -1.3, 0, this.types[0]),
      new Point(0.3, -0.3, 0, this.types[0]),
      new Point(1.3, 0.8, 0, this.types[0]),
      new Point(-1.4, -0.8, 0, this.types[0]),
      new Point(-0.4, 0.4, 0, this.types[0]),
      new Point(0.8, 1.3, 0, this.types[0]),
      new Point(0.2, -2.5, 1, this.types[1]),
      new Point(1, -1.9, 1, this.types[1]),
      new Point(1.7, -1.4, 1, this.types[1]),
      new Point(2.3, -0.8, 1, this.types[1]),
      new Point(2.9, -0.2, 1, this.types[1]),
      new Point(1.6, -2.5, 1, this.types[1]),
      new Point(2.3, -1.9, 1, this.types[1]),
      new Point(2.8, -1.3, 1, this.types[1]),
      new Point(-2.7, 1, 2, this.types[2]),
      new Point(-1.9, 1.8, 2, this.types[2]),
      new Point(-1.3, 2.4, 2, this.types[2]),
      new Point(-0.6, 2.9, 2, this.types[2]),
      new Point(-1.3, 1.2, 2, this.types[2]),
      new Point(-0.8, 1.8, 2, this.types[2]),
      new Point(-1.9, 0.9, 2, this.types[2]),
      new Point(-1.3, 1.8, 2, this.types[2]),
      new Point(-1.9, 1.4, 2, this.types[2]),
      new Point(-0.9, 2.3, 2, this.types[2]),
    ]
  },
  mounted () {
    window.dump = () => {
      this.determinatedPoints.forEach(p => {
        console.log(`new Point(${p.x}, ${p.y}, ${p.type}, this.types[${p.type}]),`)
      })
    }

    const rightColumn = this.$el.querySelector('.selector')
    if (!rightColumn) return

    rightColumn.style.maxWidth = `${307}px`

    this.windowEvent = (e) => {
      const key = e.keyCode || e.which
      if (key !== 13) return
      this.learning = !this.learning
      e.preventDefault()
    }
    window.addEventListener('keydown', this.windowEvent)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.windowEvent)
  },
  methods: {
    clearPoints () {
      this.points = []
      this.clear()
    },
    createPoint ({ x, y }, type) {
      return new Point(x, y, type, this.types[type])
    },
    handleGridClick ({ x, y }) {
      const deleted = this.points.some((point, i) => {
        const { x: pX, y: pY } = point
        if (pX === x && pY === y) {
          this.points.splice(i, 1)
          return true
        }
      })

      if (deleted) return

      this.points.push(this.createPoint({ x, y }, this.activeType))
    }
  }
}
</script>

<style scoped>
  .one > * {
    margin: 0 10px;
  }

  .label {
    width: 65px;
    margin-right: 5px;
    text-align: center;
  }

  .right-column {
    /* max-width: 256px; */
    align-items: stretch !important;
  }

  .right-column > *:not(:first-child) {
    margin-top: 20px;
  }

</style>
