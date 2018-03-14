<template>
  <div class="three flex-row-center flex-start">
    <div class="block flex-column-center flex-no-shrink" :style="{ flexBasis: '325px' }">
      <Group :width="285" name="Base">
        <div class="flex-row-center">
          <div class="label">Classes</div> <Slider :min="1" :max="10" :step="1" v-model="classes" />
          <div class="label">Delay</div> <Slider :min="30" :max="1000" :step="1" v-model="delay" />
          <div class="flex-row-center flex-content-start">
            <CheckBox v-model="manualSelect" label="Manual neurons selection" style="margin-top: 5px" />
            <CheckBox v-model="each" label="Step on each point" style="margin-top: 5px" />
          </div>
        </div>
      </Group>
      <Group :width="285" name="Rate" style="margin-top: 20px;">
        <div class="flex-row-center">
          <div class="label">Value</div> <Slider :min="0" :max="1" :step="0.001" v-model="rate" />
          
          <template v-if="decreaseRate">
            <div class="label">Step</div>
            <Slider :min="0" :max="0.1" :step="0.001" v-model="decreaseRateStep" />
          </template>
          <div class="flex-row-center flex-content-start">
            <CheckBox v-model="decreaseRate" label="Decrease rate monotonically" style="margin-top: 5px" />
          </div>
        </div>
      </Group>
      <Group :width="285" name="Neurons" style="margin-top: 20px;">
        <NeuronsView :neurons="neurons" v-model="activeNeuron" :width="285" />
      </Group>
    </div>
    <div class="block flex-column-center flex-no-shrink">
      <Group name="Coordinate system">
        <Grid @clickAt="handleGridClick" :max="2" :step="12" :activePoints="points" />
      </Group>
    </div>
    <div class="block flex-column-center" :style="{ flexBasis: '325px' }">
      <Group v-show="points.length" :width="285" :name="`Points (${points.length})`">
        <div class="flex-column-center flex-start" style="flex: 1">
          <div class="flex-row-center flex-content-start">
            <PointLabel v-for="p in points" :key="p.created" :p="p" :click="handleGridClick" />
          </div>
          <div class="flex-row-center" style="align-self: center; margin-top: 10px;">
            <button @click="clearPoints" class="default" :class="{ 'disabled': learning }" style="padding: 0 10px; margin: 0 5px">Clear</button>
            <button @click="learning = !learning" :class="[learning ? 'default' : 'primary']" style="padding: 0 10px; margin: 0 5px">{{ learning ? 'Stop' : 'Start' }}</button>
          </div>
        </div>
      </Group>
    </div>
  </div>
</template>

<script>
import Group from '@/UI/Group/'
import Slider from '@/UI/Slider'
import CheckBox from '@/UI/CheckBox'
import TypePicker from '@/UI/TypePicker'
import PointLabel from '@/UI/PointLabel'
import Grid from '@/UI/Grid/'

import Point from '../Common/Point'
import NeuronsView from './NeuronsView'
import { getColor } from './Utils'
import Neuron from './Neuron'
import NNMixin from './NNMixin'

export default {
  name: 'three',
  mixins: [NNMixin],
  components: { Grid, Group, Slider, CheckBox, PointLabel, NeuronsView },
  data () {
    return {
      learning: false,
      delay: 90,

      classes: 3,
      rate: 0.7,
      decreaseRate: true,
      each: true,
      points: [],

      neurons: [],
      activeNeuron: -1,

      decreaseRateStep: 0.001,
      manualSelect: false
    }
  },
  watch: {
    manualSelect (value) {
      if (value) {
        this.activeNeuron = -1
        this.drawLines()
      }
    },
    learning (value) {
      value ? this.start() : this.stop()
    },
    classes: {
      handler (currentValue, previousValue) {
        if (currentValue < previousValue) {
          this.neurons = this.neurons.slice(0, currentValue)
        } else {
          const addition = []
          for (let i = this.neurons.length; i < currentValue; i++) {
            addition.push(new Neuron(getColor(i)))
          }
          this.neurons = this.neurons.concat(addition)
        }
        this.updateNeurons(this.neurons)
      },
      immediate: true
    }
  },
  created () {
    window.dump = () => {
      this.points.forEach(p => {
        console.log(`this.createPoint({ x: ${p.x}, y: ${p.y} }),`)
      })
    }

    this.points = [
      this.createPoint({ x: -1, y: -1 }),
      this.createPoint({ x: 0, y: 0 }),
      this.createPoint({ x: 1, y: 1 }),

      this.createPoint({ x: -2, y: 1.5 }),
      this.createPoint({ x: -1.9, y: 1.6 }),
      this.createPoint({ x: -1.8, y: 1.7 }),
      this.createPoint({ x: -1.7, y: 1.8 }),
      this.createPoint({ x: -1.6, y: 1.9 }),
      this.createPoint({ x: -1.5, y: 2 }),
      this.createPoint({ x: 2, y: -1.5 }),
      this.createPoint({ x: 1.9, y: -1.6 }),
      this.createPoint({ x: 1.8, y: -1.7 }),
      this.createPoint({ x: 1.7, y: -1.8 }),
      this.createPoint({ x: 1.6, y: -1.9 }),
      this.createPoint({ x: 1.5, y: -2 })
    ]

    this.handlerWindow = (e) => {
      if (e.keyCode !== 27) return
      this.activeNeuron = -1
      this.drawLines()
    }
    window.addEventListener('keydown', this.handlerWindow)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handlerWindow)
  },
  methods: {
    setPointType (point, type) {
      const neuron = this.neurons[type]
      if (!neuron) throw new Error('[setPointType] this.neurons[type]')

      const { color } = neuron
      this.$set(point, 'color', color)
      this.$set(point, 'type', type)
    },
    createPoint ({ x, y }) {
      return new Point(x, y, -1, '?')
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

      this.points.push(this.createPoint({ x, y }))
    },
    flushPoints () {
      this.points.forEach(point => {
        this.$set(point, 'color', '?')
        this.$set(point, 'type', -1)
      })
    },
    clearPoints () {
      if (this.learning) return
      this.points = []

      this.$bus.$emit('step', [])
      this.init()
    }
  }
}
</script>

<style scoped>
  .three .block {
    margin: 8px;
  }

  .label {
    width: 60px;
    margin-right: 5px;
    text-align: center;
  }
</style>
