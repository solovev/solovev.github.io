import Network from './Network.ts'
import  { round } from './Utils'

export default {
  created () {
    this.init()
  },
  methods: {
    init () {
      // Euclidean distance distance based = 1
      // Amount base = 0 (SOoo bad actually!)
      this.network = new Network(1)
      this.updateNeurons()
  
      this.currentPoint = 0
    },
    eachPoint () {
      this.activeNeuron = -1
      const index = this.currentPoint % this.points.length

      const point = this.points[index]
      if (!point) return

      const { x, y } = point

      const type = this.network.train(x, y, this.rate)

      if (!this.manualSelect) {
        this.activeNeuron = type
      }

      this.setPointType(point, type)

      this.currentPoint++
      if (index === this.points.length - 1) {
        this.decreaseTrainingRate()
      }
    },
    allPoints () {
      this.activeNeuron = -1
      this.points.forEach(point => {
        const { x, y } = point

        const type = this.network.train(x, y, this.rate)
        this.setPointType(point, type)
      })
      this.decreaseTrainingRate()
    },
    start () {
      const fn = () => {
        if (!this.learning) return

        this.each ? this.eachPoint() : this.allPoints()

        this.drawLines()

        setTimeout(fn, this.delay)
      }
      fn()
    },
    stop () {

    },
    drawLines () {
      const data = []
      const activeNeuron = this.neurons[this.activeNeuron]
      if (activeNeuron) {
        const { Wx, Wy, color } = activeNeuron
        data.push({
          p1: { x: 0, y: 0 },
          p2: { x: Wx, y: Wy },
          color
        })
      } else {
        this.neurons.forEach(neuron => {
          const { Wx, Wy, color } = neuron
          data.push({
            p1: { x: 0, y: 0 },
            p2: { x: Wx, y: Wy },
            color
          })
        })
      }

      this.$bus.$emit('step', data)
    },
    decreaseTrainingRate () {
      if (!this.decreaseRate) return

      const step = this.decreaseRateStep || 0.001
      this.rate = Math.max(step, this.rate - step)
      this.rate = round(this.rate, 1000)
    },
    updateNeurons () {
      this.network && this.network.updateNeurons(this.neurons)
    }
  }
}