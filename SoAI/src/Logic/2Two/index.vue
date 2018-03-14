<template>
  <div class="two flex-row-center flex-start">
    <div class="flex-column-center column">
      <Group :disabled="learning" :width="290" name="Network">
        <div class="controls flex-column-center">
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Count of neurons' }">Neurons</div> <Slider :min="1" :max="500" :step="1" v-model="neurons" />
          </div>
          <div v-if="!randomBias" class="flex-row-center">
            <div class="label" v-tooltip="{ text: `Default neuron's bias` }">Bias</div> <Slider :min="-5" :max="5" :step="0.1" v-model="bias" />
          </div>
          <CheckBox label="Random gaussian bias" v-model="randomBias" style="margin-top: 15px"/>
          <CheckBox label="Only training output" v-model="justTrain" style="margin-top: 5px"/>
        </div>
      </Group>
      <Group :width="290" name="Activation function">
        <FunctionPicker v-model="activationFn" />
      </Group>
      <Group :width="290" :name="`Controls (Iteration: ${this.currentIt})`" >
        <div class="flex-column-center" style="flex: 1">
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: `Number of input sets` }">Test[]</div> <Slider :min="2" :max="120" :step="1" v-model="approximaFnSamples" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Delay between learning steps' }">Delay</div> <Slider :min="0" :max="1000" :step="1" v-model="delay" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Delta calibration factor' }">Momentum</div> <Slider :min="0" :max="1" :step="0.01" v-model="momentum" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Learning speed factor' }">Rate</div> <Slider :min="0" :max="1.0" :step="0.01" v-model="speed" />
          </div>
          <div class="flex-row-center" style="margin-top: 10px;">
            <button @click="clear" :class="{ 'disabled': learning }" class="default">Clear</button>
            <button @click="learning = !learning" :class="[learning ? 'default' : 'primary']" style="margin: 0 10px">{{ learning ? 'Stop' : 'Start' }} learning</button>
          </div>
        </div>
      </Group>
    </div>
    <Group :name="`Coordinate system (${learning ? 'Learning...' : 'Standby'})`">
      <Graph @input="handleGraph" :nSamples="nSamples" :radius="radius" :fn="fn" :range="range" />
    </Group>
    <div class="flex-column-center column">
      <Group :disabled="learning" :width="290" :error="graphError" name="Function">
        <div class="controls flex-column-center">
          <textarea
            class="little-round"
            v-model="fn"
            autofocus
          />
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Determine the number of equally' }">Samples</div> <Slider :min="2" :max="120" :step="1" v-model="nSamples" />
          </div>
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Size of points' }">Radius</div> <Slider :min="1" :max="10" :step="1" v-model="radius" />
          </div>
        </div>
      </Group>
      <Group :disabled="learning" :width="290" name="Range [L, R]">
        <div class="controls flex-column-center">
          <div class="flex-row-center">
            <div class="label">Left</div> <Slider :min="-100" :max="rangeB" :step="0.1" v-model="rangeA" />
          </div>
          <div class="flex-row-center">
            <div class="label">Right</div> <Slider :min="rangeA" :max="100" :step="0.1" v-model="rangeB" />
          </div>
        </div>
      </Group>
      <Group :width="290" :name="`Plots data (${groupPoints.length})`">
        <PlotsTable :groups="groupPoints" />
      </Group>
    </div>
  </div>
</template>

<script>
import Group from '@/UI/Group/'
import Slider from '@/UI/Slider'
import CheckBox from '@/UI/CheckBox'

import Graph from './Graph'
import FunctionPicker from './FunctionPicker'
import PlotsTable from './PlotsTable'

import NNMixin from './NNMixin'

export default {
  name: 'two',
  mixins: [NNMixin],
  components: { Graph, Group, Slider, FunctionPicker, PlotsTable, CheckBox },
  watch: {
    learning (value) {
      value ? this.start() : this.stop()
    },
    fn () {
      this.clear()
    },
    range () {
      this.clear()
    }
  },
  data () {
    return {
      fn: `(exp(-x) - exp(x)) * cos(x)/ (exp(x) + exp(-x))`,
      rangeA: -5,
      rangeB: 5,
      nSamples: 15,
      radius: 2,
      graphError: '',
      groupPoints: [],
      // points: [],

      approximaFnSamples: 37,
      speed: 0.03,
      momentum: 0.15,
      activationFn: 'rsigmoid',

      neurons: 41,
      randomBias: true,
      justTrain: false,
      bias: 0,

      delay: 190,
      currentIt: 0,
      learning: false
    }
  },
  mounted () {
    // this.start()
  },
  computed: {
    range () {
      return [this.rangeA, this.rangeB]
    }
  },
  methods: {
    handleGraph (data) {
      if (!data) {
        this.graphError = true
        return
      }

      const { index, points } = data
      this.$set(this.groupPoints, index, points)

      this.graphError = false
    }
  }
}
</script>

<style scoped>
  .two > * {
    margin: 0 10px;
  }

  .two > .column > *:not(:first-child) {
    margin-top: 20px;
  }

  .label {
    width: 60px;
    margin-right: 5px;
    text-align: center;
  }

  .controls {
    flex: 1;
  }

  .controls textarea {
    width: 100%;
    height: 50px;
    resize: none;
    outline: none;
    border: none;
    background-color: #f9f9f9;
  }
</style>
