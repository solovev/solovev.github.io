// import Network from './Network'
import { round } from './Utils'
import BPNetwork, { TransferFunction } from './BPNetwork'


export default {
  mounted () {
    window.start = this.start
  },
  methods: {
    createNetwork () {
      const initialBias = this.randomBias ? null : this.bias

      const network = new BPNetwork(initialBias, [this.nInputNeurons, this.nHiddenNeurons, 1], [
        TransferFunction.NONE,
        this.activationFn,
        TransferFunction.PURELIN
      ])

      return network
    },
    start (single) {
      this.clear()

      this.learning = true

      const network = this.createNetwork()

      const fn = () => {
        if (!this.learning) return

        const points = this.makeStep(network)
        points && this.$bus.$emit('outputPoints', points)

        this.currentIt++

        if (single) return

        this.timeoutId = setTimeout(fn, this.delay)
      }
      fn()
    },
    makeStep (network) {
      const sourcePoints = this.groupPoints[0]
      if (!sourcePoints) return console.error('No points!?')

      // Train network
      const trainPatters = []
      for (let i = 0; i < this.nPatterns; i++) {
        const pattern = []
        for (let j = 0; j < this.lPattern; j++) {
          pattern[j] = sourcePoints[i + j][1]
        }
        trainPatters.push(pattern)
      }

      trainPatters.map(pattern => {
        const input = pattern.slice(0, -1)
        const output = pattern.slice(-1)
        network.train(input, output, this.speed, this.momentum, this.activationFn)
      })

      // Test network
      const testPatterns = []
      const firstTestPointIndex = this.allPoints.length - this.nTestSamples

      for (let i = firstTestPointIndex; i < this.allPoints.length; i++) {
        const pattern = []
        for (let j = 0; j < this.lPattern; j++) {
          pattern[j] = this.allPoints[i - (this.lPattern - j) + 1][1]
        }
        testPatterns.push(pattern)
      }

      let rmse = 0
      const result = testPatterns.map((pattern, i) => {
        if (i === 0) {
          return sourcePoints[sourcePoints.length - 1]
        }

        const point = this.allPoints[firstTestPointIndex + i]
        const x = point[0]
        const desiredY = point[1]
        const input = pattern.slice(0, -1)
        const [ y ] = network.start(input)

        rmse += Math.pow(y - desiredY, 2)

        return [x, y]
      })

      this.rmse = round(Math.sqrt(rmse / this.nTestSamples))

      return result
    },
    stop () {
      this.learning = false
      this.timeoutId && clearTimeout(this.timeoutId)
    },
    clear () {
      this.stop()
      this.currentIt = this.rmse = 0
    }
  }
}