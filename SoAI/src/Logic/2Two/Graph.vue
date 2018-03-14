<template>
  <div class="graph" :style="{ width: `${size}px`, height: `${size}px` }">

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
  name: 'graph',
  props: {
    fn: {
      type: String | Array,
      required: true
    },
    range: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 480
    },
    nSamples: {
      type: Number,
      required: true
    },
    disableZoom: {
      type: Boolean,
      default: false
    },
    radius: Number
  },
  watch: {
    fn (value) {
      this.updatePlot()

      this.updateMainFunction()
    },
    range () {
      this.updatePlot()

      var xDomain = [this.range[0] - 1, this.range[1] + 1]
      var yDomain = computeYScale(this.size, this.size, xDomain)

      this.plot.programmaticZoom(xDomain, yDomain)
    },
    nSamples () {
      this.updatePlot()
    },
    radius () {
      this.updatePlot()
    },
    disableZoom () {
      this.updatePlot({ disableZoom: this.disableZoom })
    }
  },
  created () {
    window.h = this.handler = (points) => {
      const { range, nSamples, radius } = this

      const outputData = {
        fnType: 'points',
        graphType: 'polyline',
        points,
        range,
        color: 'var(--main-color)',
        // attr: { r: radius, fill: 'var(--main-color)' },
      }

      this.updatePlot({ data: [this.createData(), outputData] })
    }
    this.$bus.$on('outputPoints', this.handler)
  },
  beforeDestroy () {
    this.$bus.$off('outputPoints')
  },
  mounted () {
    const { fn, range, size } = this

    this.options = {
      width: size,
      height: size,
      xDomain: range,
      yDomain: computeYScale(size, size, range),
      disableZoom: this.disableZoom,
      target: this.$el
    }

    this.plot = FunctionPlot(this.options)

    if (!this.listener) {
      this.listener = (data, index) => {
        let summarize = []
        data.forEach(points => {
          summarize = [...summarize, ...points]
        })
        this.$emit('input', { index, points: summarize })
      }
      this.plot.on('eval', this.listener)
    }
    this.updatePlot()

    this.updateMainFunction()


  },
  beforeDestroy () {

  },
  methods: {
    updateMainFunction () {
      window.mainFunction = (x) => {
        const datum = { fn: this.fn }
        const scope = { x }
        return FunctionPlot.eval.builtIn(datum, 'fn', scope)
      }
    },
    updatePlot (data) {
      data = data || { data: [this.createData()] }
      Object.assign(this.options, data)

      try {
        FunctionPlot(this.options)
      } catch (e) {
        console.warn(e.message)
        this.$emit('input', null)
      }
    },

    createData () {
      const { fn, range, size, nSamples, radius } = this

      return {
          fn,
          range,
          color: 'var(--primary-color)',
          graphType: 'scatter',
          attr: { r: radius, fill: 'var(--primary-color)' },
          nSamples
      }

      // return {
      //   range,
      //   color: 'var(--primary-color)',
      //   attr: { r: 4, fill: 'var(--primary-color)' },
      //   points: fn,
      //   graphType: 'scatter',
      //   fnType: 'points'
      // }
    }
  }
}
</script>

<style scoped>
  .graph {
    position: relative;
  }
</style>
