<template>
  <div class="five flex-row-center flex-start">
    <SamplesPreview :samples="samples" :activeSampleGroup="activeSampleGroup" />
    <div class="column flex-column-center">
      <Group name="Canvas (Hold shift/ctrl to erase)">
        <Sheet ref="sheet" :size="canvasSize" :pointsPerRow="pointsPerRow" />
      </Group>
      <Group :width="canvasSize" name="Drawer controls">
        <SampleControls v-model="activeSampleGroup" :match="matchSampleGroup" />
      </Group>
    </div>
    <div class="column flex-column-center">
      <Group :disabled="learning" :width="290" name="Options">
        <div class="label" v-tooltip="{ text: 'Points per row' }">Density</div> <Slider :min="5" :max="50" :step="1" v-model="pointsPerRow" />
        <div class="flex-row-center flex-content-start" style="width: 100%;">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Number of input neurons` }">
            N<sub>input</sub>:
          </div>
          <div style="padding-left: 5px">
            {{ nInput }}
          </div>
        </div>
        <div class="label" v-tooltip="{ text: 'Number of hideen neurons' }">N<sub>hidden</sub>:</div> <Slider :min="minNHidden" :max="nInput * 2" :step="1" v-model="nHidden" />
        <div class="flex-row-center flex-content-start" style="width: 100%;">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Number of output neurons` }">
            N<sub>output</sub>:
          </div>
          <div style="padding-left: 5px">
            {{ nOutput }}
          </div>
        </div>
      </Group>
      <Group :width="290" :name="`Controls (Iteration: ${currentIt})`">
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Learning speed factor' }">Rate</div> <Slider :min="0" :max="1.0" :step="0.01" v-model="speed" />
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Maximum number of learning iterations' }">Sets</div> <Slider :min="0" :max="2000" :step="1" v-model="iterations" />
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Deisred error' }">Error</div> <Slider :min="0" :max="0.1" :step="0.0001" v-model="error" />
        </div>
        <div class="flex-row-center" style="width: 100%; margin-top: 5px">
          <button @click="clear" :class="{ 'disabled': learning }" class="default" style="margin: 0 5px">Clear</button>
          <button @click="solve()" :class="{ 'disabled': learning || currentIt === 0 }" class="primary" style="margin: 0 5px">Solve</button>
          <button @click="learning ? stop() : start()" :class="[learning ? 'default' : 'primary']" style="margin: 0 5px">{{ learning ? 'Stop' : 'Start' }} learning</button>
        </div>
      </Group>
      <Group :width="290" :name="`Chart`">
        <SamplesChart :outputs="outputs" :result="result" />
      </Group>
    </div>
  </div>
</template>

<script>
import DigitSamples from './DigitSamples'
import ShapesSamples from './ShapesSamples'

import Group from '@/UI/Group/'
import Slider from '@/UI/Slider'

import Sheet from './Sheet/'
import SamplesPreview from './SamplesPreview'
import SamplesChart from './SamplesChart'
import SampleControls from './SampleControls'
import NNMixin from './NNMixinWorker'

export default {
  name: 'five',
  mixins: [NNMixin],
  components: {
    Group,
    Slider,

    Sheet,
    SamplesPreview,
    SampleControls,
    SamplesChart
  },
  data () {
    return {
      learning: false,
      pointsPerRow: 10,
      samples: {},
      nHidden: 50,
      activationFn: 'tansig',
      iterations: 1500,
      currentIt: 0,
      speed: 0.05,
      momentum: 0.1,
      error: 0.005,
      ///
      result: null,
      activeSampleGroup: ''
    }
  },
  watch: {
    pointsPerRow: {
      handler (value) {
        const samples = JSON.parse(localStorage.getItem(`data_${value}`))
        this.samples = samples || {}
        this.activeSampleGroup = ''

        this.clear()
      },
      immediate: true
    }
  },
  created () {
    this.canvasSize = 500

    Object.keys(ShapesSamples).forEach(key => {
      const existed = localStorage.getItem(`data_${key}`)
      if (existed) return

      localStorage.setItem(`data_${key}`, JSON.stringify(ShapesSamples[key]))

      if (+key === this.pointsPerRow) {
        this.samples = ShapesSamples[key]
      }
    })

    window.loadDigits = () => {
      const key = this.pointsPerRow + ''
      const samples = DigitSamples[key]
      if (!samples) return null

      this.samples = samples
      localStorage.setItem(`data_${key}`, JSON.stringify(samples))
    }

    window.loadShapes = () => {
      const key = this.pointsPerRow + ''
      const samples = ShapesSamples[key]
      if (!samples) return null

      this.samples = samples
      localStorage.setItem(`data_${key}`, JSON.stringify(samples))
    }
  },
  mounted () {
    window.dump = () => JSON.stringify(this.$refs.sheet.getPoints())
    window.set = (value) => this.pointsPerRow = value

    this.$bus.$on('selectSample', data => {
      const { group } = data
      this.activeSampleGroup = group
    })

    this.$bus.$on('removeSample', data => {
      const { group, index } = data
      this.samples[group].splice(index, 1)
      if (this.samples[group].length === 0) {
        this.$delete(this.samples, group)
      }
      this.saveSamples()
    })

    this.$bus.$on('savePoints', this.savePointsHandler = ({ name } = {}) => {
      if (!name) return

      const points = this.$refs.sheet.getPoints()
      console.log(points)
      if (this.samples[name]) {
        this.samples[name].push(points)
      } else {
        this.$set(this.samples, name, [points])
      }
      this.saveSamples()
    })
  },
  beforeDestroy () {
    this.$bus.$off('selectSample')
    this.$bus.$off('removeSample')
    this.$bus.$off('savePoints', this.savePointsHandler)
  },
  computed: {
    minNHidden () {
      return 10 || Math.round(this.nInput / 2)
    },
    nInput () {
      return this.pointsPerRow * this.pointsPerRow
    },
    nOutput () {
      return Object.keys(this.samples).length
    },
    matchSampleGroup () {
      return !!this.samples[this.activeSampleGroup.toLowerCase()]
    }
  },
  methods: {
    saveSamples () {
      localStorage.setItem(`data_${this.pointsPerRow}`, JSON.stringify(this.samples))
    }
  }
}
</script>

<style scoped>
.five {
  user-select: none;
}

.five > * {
  margin: 0 10px;
}

.five > .column > *:not(:first-child) {
  margin-top: 20px;
}

.label {
    width: 60px;
    margin-right: 5px;
    text-align: center;
  }
</style>
