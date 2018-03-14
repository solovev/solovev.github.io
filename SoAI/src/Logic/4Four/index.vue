<template>
  <div class="two flex-row-center flex-start">
    <div class="flex-column-center column">
      <Group :disabled="learning" :width="290" :error="graphError" name="Function">
        <div class="controls flex-column-center">
          <textarea
            class="little-round"
            v-model="fn"
            autofocus
          />
          <div class="flex-row-center">
            <div class="label" v-tooltip="{ text: 'Size of points' }">Radius</div> <Slider :min="1" :max="10" :step="1" v-model="radius" />
          </div>
          <div class="flex-row-center">
            <div class="label">Min</div> <Slider :min="-100" :max="rangeB" :step="0.1" v-model="rangeA" />
          </div>
          <div class="flex-row-center">
            <div class="label">Max</div> <Slider :min="rangeA" :max="100" :step="0.1" v-model="rangeB" />
          </div>
        </div>
      </Group>
      <Group :width="290" :name="`Plots data (${groupPoints.length})`">
        <PlotsTable :groups="groupPoints" :maxRows="5" />
      </Group>
      <Group :width="290" name="Activation function">
        <FunctionPicker v-model="activationFn" />
      </Group>
    </div>
    <Group :name="`Coordinate system (${learning ? 'Learning...' : 'Standby'})`">
      <div class="flex-column-center">
        <Graph @allP="handleAllP" @input="handleGraph" :nSamples="nSamples" :noise="noise" :nTestSamples="nTestSamples" :radius="radius" :fn="fn" :range="range" />
        <a target="_blank" v-tooltip="{ text: 'Algorithm explanation (for nobrainers like me)' }" class="text-cutter" href="https://stats.stackexchange.com/questions/10162/how-to-apply-neural-network-to-time-series-forecasting">https://stats.stackexchange.com/questions/10...</a>
      </div>
    </Group>
    <div class="flex-column-center column">
      <Group :disabled="learning" :width="290" name="Base options">
        <div class="flex-row-center">
          <div class="label" style="text-align: left" v-tooltip="{ text: 'Number of samples (points)' }">N<sub>total</sub></div> <Slider :min="5" :max="120" :step="1" v-model="nSamples" />
        </div>
        <div class="flex-row-center">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Number of training samples` }">N<sub>train</sub></div> <Slider :min="1" :max="nSamples - 1" :step="1" v-model="nTrainingSamples" />
        </div>
        <div class="flex-row-center flex-content-start" style="width: 100%; margin: 5px 0; align-items: flex-start">
          <div v-tooltip="{ text: `Number of test samples` }">N<sub>test</sub></div><div>: {{ nTestSamples }}</div>&nbsp;<div class="il">(N<sub>total</sub> - N<sub>train</sub>)</div>
        </div>
        <div class="flex-row-center" style="border-top: 1px solid #f1f1f1; margin-top: 5px; padding-top: 5px">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Noise (% of amplitude)` }">Noise</div> <Slider :min="0" :max="100" :step="1" v-model="noise" />
        </div>
        <div class="flex-row-center" style="border-top: 1px solid #f1f1f1; margin-top: 5px; padding-top: 10px">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Length of training pattern` }">L<sub>pattern</sub></div> <Slider :min="1" :max="nTrainingSamples - 1" :step="1" v-model="lPattern" />
        </div>
        <div class="flex-row-center flex-content-start" style="width: 100%;">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Number of training patterns` }">
            N<sub>patterns</sub>:
          </div>
          <div style="padding-left: 15px">
            {{ nPatterns }}
          </div>
        </div>
        <div class="flex-row-center flex-content-start" style="margin-top: 5px; width: 100%;">
          <div v-tooltip="{ text: 'Number of input neurons' }" class="label" style="text-align: left">
            N<sub>input</sub>:
          </div>
          <div style="padding-left: 15px">
            {{ nInputNeurons }}
          </div>
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Number of hidden neurons' }">N<sub>hidden</sub></div> <Slider :min="minHidden" :max="nInputNeurons * 3" :step="1" v-model="nHiddenNeurons" />
        </div>
      </Group>
      <Group :width="290" :name="`Controls (Iteration: ${currentIt})`">
        <div class="flex-row-center flex-content-start" style="width: 100%;">
          <div class="label" style="text-align: left" v-tooltip="{ text: `Root Mean Square Error` }">
            RMSE:
          </div>
          <div style="padding-left: 5px">
            {{ rmse }}
          </div>
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Delta calibration factor' }">Momentum</div> <Slider :min="0" :max="1" :step="0.01" v-model="momentum" />
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Learning speed factor' }">Rate</div> <Slider :min="0" :max="1.0" :step="0.01" v-model="speed" />
        </div>
        <div class="flex-row-center">
          <div class="label" v-tooltip="{ text: 'Delay between learning steps' }">Delay</div> <Slider :min="0" :max="1000" :step="1" v-model="delay" />
        </div>
        <div v-if="!randomBias" class="flex-row-center">
          <div class="label" v-tooltip="{ text: `Default neuron's bias` }">Bias</div> <Slider :min="-5" :max="5" :step="0.1" v-model="bias" />
        </div>
        <div class="flex-row-center" style="width: 100%;">
          <CheckBox label="Random gaussian bias" v-model="randomBias" style="margin-top: 5px"/>
        </div>
        <div class="flex-row-center" style="width: 100%;  margin-top: 10px;">
          <button @click="clear" :class="{ 'disabled': learning }" class="default">Clear</button>
          <button @click="learning ? stop() : start()" :class="[learning ? 'default' : 'primary']" style="margin: 0 10px">{{ learning ? 'Stop' : 'Start' }} learning</button>
        </div>
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
  name: 'four',
  mixins: [NNMixin],
  components: { Graph, Group, Slider, FunctionPicker, PlotsTable, CheckBox },
  watch: {

  },
  data () {
    return {
      fn: `cos(x-0.5)*abs(x)`,
      nSamples: 40,
      nTrainingSamples: 30,
      lPattern: 10,
      rangeA: 0.1,
      rangeB: 10,
      noise: 20,
      radius: 2,
      graphError: '',
      groupPoints: [],
      // points: [],

      speed: 0.03,
      momentum: 0.15,
      randomBias: true,
      bias: 0,
      nHiddenNeurons: 0,
      activationFn: 'rsigmoid',
      rmse: 0,

      delay: 200,
      currentIt: 0,
      learning: false
    }
  },
  created () {
    this.nHiddenNeurons = this.nInputNeurons
  },
  computed: {
    nPatterns () {
      return this.nTrainingSamples - this.lPattern + 1
    },
    nTestSamples () {
      return this.nSamples - this.nTrainingSamples
    },
    nInputNeurons () {
      return this.lPattern - 1
    },
    range () {
      return [this.rangeA, this.rangeB]
    },
    ///
    minHidden () {
      return Math.round((this.nInputNeurons + 1) / 2)
    }
  },
  methods: {
    handleAllP (data) {
      this.allPoints = data
    },
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

  .two a {
    display: block;
    min-width: 0;
    flex-shrink: 1;
    font-size: 0.8rem;
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
