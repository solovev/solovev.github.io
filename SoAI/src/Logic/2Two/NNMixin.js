// import Network from './Network'
import BPNetwork, { TransferFunction } from './BPNetwork'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const round = value => Math.round(value * 100) / 100

export default {
  mounted () {
    let network

    window.step = () => {
      network = new BPNetwork(null, [1, 2, 1], [
        TransferFunction.NONE,
        this.activationFn,
        TransferFunction.PURELIN
      ])

      const input = [1]
      let error = 0;
      for (let i = 0; i < 1000; i++) {
        const result = network.train(
          input,
          [2.5],
          0.15,
          0.1
        )

        if (i % 100 === 0) {
          console.log(i, result)
        }
      }
    }

    window.start = this.start
    window.c = this.stepDifferentSamples
  },
  methods: {
    createNetwork () {
      const initialBias = this.randomBias ? null : this.bias

      if (this.network && this.cachedInitialBias === initialBias && this.cachedNeurons === this.neurons) {
        return this.network
      }

      const network = new BPNetwork(initialBias, [1, this.neurons, 1], [
        TransferFunction.NONE,
        this.activationFn,
        TransferFunction.PURELIN
      ])

      this.cachedInitialBias = initialBias
      this.cachedNeurons = this.neurons

      return network
    },
    start () {
      this.currentIt = 0
      this.network = this.createNetwork()

      const fn = () => {
        if (!this.learning) return

        const same = this.approximaFnSamples === this.nSamples

        const points = !this.justTrain ? this.stepActualSamples() : (same ? this.stepSameSamples : this.stepDifferentSamples)()
        this.$bus.$emit('outputPoints', points)

        this.currentIt++

        setTimeout(fn, this.delay)
      }
      fn()
    },
    stop () {
      // clearInterval(this.intervalLearningId)
    },
    clear () {
      if (this.learning) return

      this.currentIt = 0

      this.network = null
      this.cachedInitialBias = null
      this.cachedNeurons = null
      this.cachedApproximaFnSamples = null

      this.$delete(this.groupPoints, 1)
      this.$bus.$emit('outputPoints', [[0, 0]])
    },
    stepActualSamples () {
      if (this.approximaFnSamples !== this.cachedApproximaFnSamples) {
        const range = Math.abs(this.rangeB - this.rangeA)
        const step = range / (this.approximaFnSamples - 1)

        const xValues = []

        for (let x = this.rangeA; x < this.rangeB; x += step) {
          xValues.push(x)
        }
        xValues.push(this.rangeB)
        this.xValues = xValues

        this.cachedApproximaFnSamples = this.approximaFnSamples
      }

      const points = this.groupPoints[0]
      points.map(point => {
        const [x, y] = point
        this.network.train([x], [y], this.speed, this.momentum, this.activationFn)
      })

      return this.xValues.map(x => {
        const [ y ] = this.network.start([x])
        return [x, y]
      })
    },
    stepDifferentSamples () {
      if (this.approximaFnSamples !== this.cachedApproximaFnSamples) {
        const range = Math.abs(this.rangeB - this.rangeA)
        const step = range / (this.approximaFnSamples - 1)

        const xValues = []

        for (let x = this.rangeA; x < this.rangeB; x += step) {
          xValues.push(x)
        }
        xValues.push(this.rangeB)
        this.xValues = xValues

        this.cachedApproximaFnSamples = this.approximaFnSamples
      }

      return this.xValues.map(x => {
        const y = window.mainFunction(x)
        const { output } = this.network.train([x], [y], this.speed, this.momentum, this.activationFn)
        return [x, output[0]]
      })
    },
    stepSameSamples() {
      const points = this.groupPoints[0]

      return points.map(point => {
        const [x, y] = point
        const { output } = this.network.train([x], [y], this.speed, this.momentum, this.activationFn)
        return [x, output[0]]
      })
    }
  }
}