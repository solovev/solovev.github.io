import Neuron from './Neuron'
import { getRandomGaussian, rnd } from './Utils'

function indexOfSmallest(a: number[]) {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
   if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
 }

export default class {
  neurons: Neuron[]

  constructor (public type: number = 0) {
    
  }

  updateNeurons = (neurons: Neuron[]) => {
    this.neurons = neurons

    switch (this.type) {
      case 1: {
        const limit = 1 / Math.sqrt(2)
        const min = -limit
        const max = limit

        this.neurons.forEach(neuron => {
          const Wx = rnd(min, max)
          const Wy = rnd(min, max)

          neuron.init(Wx, Wy)
        })
        break
      }
      default: this.neurons.forEach(neuron => neuron.init(getRandomGaussian(), getRandomGaussian()))
    }
  }

  train = (x, y, factor): number => {
    switch (this.type) {
      case 1: return this.trainOne(x, y, factor)
      default: return this.trainZero(x, y, factor)
    }
  }

  trainOne = (x, y, factor): number => {
    const distances = this.neurons.map(neuron => {
      const { Wx, Wy } = neuron
      return Math.sqrt(Math.pow(x - Wx, 2) + Math.pow(y - Wy, 2))
    })

    const index = indexOfSmallest(distances)
    this.neurons[index].train(x, y, factor)

    return index
  }

  trainZero = (x, y, factor): number => {
    const outs = this.neurons.map(neuron => {
      return neuron.calculateOut(x, y)
    })

    let index = 0
    let max = outs[index]

    for (let i = 1; i < outs.length; i++) {
      const value = outs[i]
      if (value > max) {
        max = value
        index = i
      }
    }

    this.neurons[index].train(x, y, factor)

    return index
  }

  isFullyTrain = (): boolean => {
    for (let neuron of this.neurons) {
      if (!neuron.fullyTrain) return false
    }
    return true
  }
}