<template>
  <div class="select controls flex-column-center">
    <div v-for="(v, key) in functions" v-show="key === value" :key="key + '1'" :id="key" class="flex-row-center">

    </div>
    <div class="flex-row-center" v-for="group in groups" :key="group[0]">
      <button v-for="(fn) in group" :key="fn"
        @click="click" :class="[value === fn ? 'primary' : 'default']" style="margin: 0 10px"
      >{{ fn }}</button>
    </div>
  </div>
</template>

<script>
import FunctionPlot from 'function-plot'

function computeYScale (width, height, xScale) {
  var xDiff = xScale[1] - xScale[0]
  var yDiff = height * xDiff / width
  return [-yDiff / 2, yDiff / 2]
}

export default {
  name: 'fn-picker',
  props: ['value'],
  created () {
    // this.functions = {
    //   tansig: (x, a = 1) => (exp(a * x) - exp(-a * x)) / (exp(a * x) + exp(-a * x)),
    //   logsig: (x, a = 1) => 1 / (1 + exp(-a * x)),
    //   purelin: (x, k = 1) => k * x,
    //   ReLU: (x) => max(0, x)
    // }


    // window.dFunctions = {
    //   tansig: (x) => 1 - x * x,
    //   logsig: (x) => x * (1 - x),
    //   purelin: (x) => 1,
    //   ReLU: (x) => +(x >= 0)
    // }

    this.functions = Object.assign({}, window.functions)

    this.strFns = window.stringFunctions
  },
  beforeDestroy () {
    // delete window['functions']
  },
  mounted () {
    Object.keys(this.functions).forEach(key => {
      this.setupPreview(key)
    })
  },
  computed: {
    groups () {
      const perLine = 2
      const result = []
      let group = []

      let i = 0

      const keys = Object.keys(this.functions).filter(key => !['purelin', 'none'].includes(key))
      keys.forEach((key, index) => {
        group.push(key)

        if (i === perLine - 1 || index === keys.length - 1) {
          result.push([...group])
          group = []

          i = 0
        } else {
          i++
        }
      })
      return result
    }
  },
  methods: {
    setupPreview (key) {
      const size = 120
      const range = [-100, 100]

      const data = [{
          fn: this.strFns[key],
          range,
          color: 'var(--primary-color)'
      }]

      const options = {
        width: size * 2,
        height: size,
        xDomain: range,
        yDomain: computeYScale(size, size, range),

        target: this.$el.querySelector('#' + key),
        data
      }

      FunctionPlot(options)
    },
    setActivationFunction (fn) {
      this.$emit('input', fn)
    },
    click (e) {
      const { target } = e
      this.setActivationFunction(target.innerText)
    }
  }
};
</script>

<style scoped>
.select {
  padding: 10px;
  padding-top: 0;
}

.select > div {
  margin-top: 10px;
}

.select button {
  width: 100px;
}
</style>
