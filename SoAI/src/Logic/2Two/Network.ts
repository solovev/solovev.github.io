export class HiddenLayerNeuron {
  weight: number
  bias: number
  rate: number
  fn: Function
  dFn: Function

  summ: number = 0
  out: number= 0

  x: number = 0

  constructor ({ fn, bias, rate }: { fn: string, bias: number, rate: number }) {
    const functions = (window as any).functions
    const dFunctions = (window as any).dFunctions
    this.fn = functions[fn]
    this.dFn = dFunctions[fn]

    this.weight = Math.random() / 2
    this.bias = bias
    this.rate = rate
  }

  calculate (x): number {
    this.x = x
    this.summ = this.weight * x + this.bias * 1
    return this.out = this.fn(this.summ)
  }
}


export class OutputLayerNeuron {
  weights: number[]
  hiddenLayerNeurons: HiddenLayerNeuron[] 
  bias: number
  rate: number

  fn: Function
  dFn: Function

  summ: number = 0
  out: number = 0

  constructor ({ neurons, bias, rate, fn }: { fn: string, neurons: HiddenLayerNeuron[], bias: number, rate: number }) {
    const functions = (window as any).functions
    const dFunctions = (window as any).dFunctions
    this.fn = functions[fn]
    this.dFn = dFunctions[fn]

    this.weights = neurons.map(() => Math.random() / 2)

    this.bias = bias
    this.rate = rate
    this.hiddenLayerNeurons = neurons
  }

  calculate (values: number[]) {
    this.summ = this.bias * 1

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const weight = this.weights[i]
      this.summ += weight * value
    }

    return this.out = this.fn(this.summ)
  }
}


export default class {
  hiddenLayerNeurons: HiddenLayerNeuron[] 
  outputLayerNeuron: OutputLayerNeuron

  rate: number 
  constructor ({ count, bias, rate, fn, mobilityFactor }: { count: number, rate: number, bias: number, fn: string, mobilityFactor: number }) {
    this.hiddenLayerNeurons = []
    for (let i = 0; i < count; i++) {
      const neuron = new HiddenLayerNeuron({ fn, bias, rate })
      this.hiddenLayerNeurons.push(neuron)
    }
    this.outputLayerNeuron = new OutputLayerNeuron({ neurons: this.hiddenLayerNeurons, bias, rate, fn: 'purelin' })
  
    this.rate = rate
  }

  step (x: number): number {
    const outHiddenValues = this.hiddenLayerNeurons.map(neuron => {
      return neuron.calculate(x)
    })
    
    const outputValue = this.outputLayerNeuron.calculate(outHiddenValues)
    const targetValue = (window as any).mainFunction(x)

    // this.backwardPropogation(outputValue, targetValue)

    return targetValue - outputValue
  }

  backwardPropogation (outputValue: number, targetValue: number) {
    // const E = (1/2) * Math.pow(outerHeight - targetValue, 2)
  
    const deltaK = (outputValue - targetValue) // * outputValue * (1 - outputValue)

    // For output layer node
    // const dOE = (Oj: number) => {
    //   return deltaK * Oj
    // }

    // For output hidden node
    const deltaJ = (neuron: HiddenLayerNeuron, weight: number) => {
      const { x, out } = neuron

      const deltaJ = out * (1 - out) * deltaK * weight
      return deltaJ
    }

    const { weights, hiddenLayerNeurons } = this.outputLayerNeuron
    for (let i = 0; i < weights.length; i++) {
      const neuron = this.hiddenLayerNeurons[i]
      const dW = -this.rate * deltaK * neuron.out
      weights[i] = weights[i] + dW
    }
    const dB = -this.rate * deltaK
    this.outputLayerNeuron.bias = this.outputLayerNeuron.bias + dB


    const neurons = this.hiddenLayerNeurons
    for (let i = 0; i < neurons.length; i++) {
      const neuron = neurons[i]

      // Or neuron.weight?
      const weight = weights[i]

      const delta = deltaJ(neuron, weight)
      const dW = -this.rate * delta * neuron.x
      const dB = -this.rate * delta

      neuron.weight += dW
      neuron.bias += dB
    }
  }
}