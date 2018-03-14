<template>
  <div class="graph" :style="{ width: `${size}px`, height: `${size}px` }">

  </div>
</template>

<script>
import mathjs from 'mathjs'
import FunctionPlot from 'function-plot'

import { rnd } from './Utils.ts'

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
      default: true
    },
    radius: Number,
    nTestSamples: Number,
    noise: Number
  },
  watch: {
    fn (value) {
      this.code = mathjs.compile(this.fn)
      this.updatePlot()

      this.updateMainFunction()
      this.handler()
    },
    noise () {
      this.updatePlot()
      this.handler()
    },
    range () {
      this.code = mathjs.compile(this.fn)
      this.updatePlot()
      this.handler()

      var xDomain = [this.range[0] - 1, this.range[1] + 1]
      var yDomain = computeYScale(this.size, this.size * 2, xDomain)

      this.plot.programmaticZoom(xDomain, yDomain)
    },
    nTestSamples () {
      this.updatePlot()
    },
    nSamples () {
      this.updatePlot()
      this.handler()
    },
    radius () {
      this.updatePlot()
      this.handler()
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
        points: points || [[0, 0]],
        range,
        color: 'var(--main-color)',
        // attr: { r: radius, fill: 'var(--main-color)' },
      }

      this.updatePlot({ data: [...this.createData(), outputData] })
    }
    this.$bus.$on('outputPoints', this.handler)
  },
  beforeDestroy () {
    this.$bus.$off('outputPoints')
  },
  mounted () {
    const { fn, range, size } = this

    const xDomain = [this.range[0] - 1, this.range[1] + 1]
    const yDomain = computeYScale(this.size, this.size * 2, xDomain)

    this.options = {
      width: size,
      height: size,
      xDomain,
      yDomain,
      disableZoom: this.disableZoom,
      target: this.$el
    }

    this.plot = FunctionPlot(this.options)

    if (!this.listener) {
      this.listener = (data, index) => {
        if (index === 1) {
          let summarize = []
          data.forEach((points, i) => {
            summarize = [...summarize, ...points]
          })
          this.$emit('allP', summarize)
          return
        }

        index = index === 0 ? 0 : index - 1

        let summarize = []
        data.forEach((points, i) => {
          summarize = [...summarize, ...points]
        })
        this.$emit('input', { index, points: summarize })
      }
      this.plot.on('eval', this.listener)
    }

    this.code = mathjs.compile(this.fn)
    this.updatePlot()

    this.plot.programmaticZoom(xDomain, yDomain)

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
      data = data || { data: [...this.createData()] }
      Object.assign(this.options, data)

      try {
        FunctionPlot(this.options)
      } catch (e) {
        console.warn(e.message)
        this.$emit('input', null)
      }
    },

    createData () {
      const { range, radius } = this

      this.recomputeXs(range)

      const xLength = this.xValues.length
      const cachedXLength = this.cachedXLength || 0

      const isSame = xLength === cachedXLength && this.noise === this.cachedNoise && this.fn === this.cachedFn

      const points = isSame ? this.cachedPoints : this.xValues.map(x => {
        let y = this.code.eval({ x })
        if (!this.noise) return [x, y]

        const offset = y * (this.noise / 100)
        y = y + rnd(-1, 1) * offset

        return [x, y]
      })
      this.cachedXLength = xLength
      this.cachedPoints = points
      this.cachedNoise = this.noise
      this.cachedFn = this.fn

      const trainData = this.createDataByPoints(points.slice(0, -this.nTestSamples), true)
      const testData = this.createDataByPoints(points, false)

      return [trainData, testData]
    },
    createDataByPoints (points, isLine, color = 'var(--primary-color)') {
      const { radius } = this

      const graphType = isLine ? 'polyline' : 'scatter'
      const attr = isLine ? { stroke: color } : { r: radius, fill: color, stroke: color }
      return {
        points,
        fnType: 'points',
        attr,
        graphType
      }
    },
    recomputeXs (range) {
      const [min, max] = range
      const difference = max - min

      if (difference !== this.cachedDifference || this.nSamples !== this.cachedSamples) {
        const r = Math.abs(max - min)
        const step = r / (this.nSamples - 1)

        const xValues = []

        for (let x = min; x < max; x += step) {
          xValues.push(x)
        }
        xValues.length < this.nSamples && xValues.push(max)
        this.xValues = xValues

        this.cachedDifference = difference
        this.cachedSamples = this.nSamples
      }
    }
  }
}
</script>

<style scoped>
  .graph {
    position: relative;
  }
</style>
