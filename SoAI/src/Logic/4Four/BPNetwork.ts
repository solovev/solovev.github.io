export const enum TransferFunction {
  NONE = 'none',
  LOGSIG = 'logsig',
  PURELIN = 'purelin',
  TANSIG = 'tansig',
  GAUSSIAN = 'gaussian',
  RATSIGMOID = 'rsigmoid'
}

const functions = Object.freeze({
  [TransferFunction.RATSIGMOID]: (x) => x / (1 + Math.sqrt(1 + x * x)),
  [TransferFunction.NONE]: (x) => 0.0,
  [TransferFunction.LOGSIG]: (x, a = 1) => 1 / (1 + Math.exp(-a * x)),
  [TransferFunction.PURELIN]: (x, k = 1) => k * x,
  [TransferFunction.TANSIG]: (x) => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x)),
  [TransferFunction.GAUSSIAN]: (x) => Math.exp(-Math.pow(x, 2))
});

(window as any).functions = functions

const derivatives = {
  [TransferFunction.NONE]: (x) => 0.0,
  [TransferFunction.LOGSIG]: (x) => {
    const fn = functions[TransferFunction.LOGSIG]
    return fn(x) * (1 - fn(x))
  },
  [TransferFunction.PURELIN]: (x) => 1,
  [TransferFunction.TANSIG]: (x) => {
    const fn = functions[TransferFunction.TANSIG]

    const value = fn(x)
    return 1 - Math.pow(value, 2)
  },
  [TransferFunction.GAUSSIAN]: (x) => {
    const fn = functions[TransferFunction.GAUSSIAN]
    return -2 * x * fn(x)
  },
  [TransferFunction.RATSIGMOID]: (x) => {
    let value = Math.sqrt(1 + x * x)
    return 1 / (value * (1 + value))
  }
};

(window as any).dFunctions = derivatives;

(window as any).stringFunctions = {
  [TransferFunction.NONE]: '0',
  [TransferFunction.GAUSSIAN]: 'exp(-(x * x))',
  [TransferFunction.LOGSIG]: '1 / (1 + exp(-x))',
  [TransferFunction.PURELIN]: 'x',
  [TransferFunction.TANSIG]: '(exp(x) - exp(-x)) / (exp(x) + exp(-x))',
  [TransferFunction.RATSIGMOID]: 'x / (1 + sqrt(1 + x * x))'
}

const evaluate = (transferFunction: TransferFunction, value: number) => {
  return functions[transferFunction](value)
}

const evaluateDerivative = (transferFunction: TransferFunction, value: number) => {
  return derivatives[transferFunction](value)
}

const getRandomGaussian = (mean: number = 0.0, stddev: number = 1.0) => {
  let u = 0
  let v = 0
  let s = 0
  let t = 0

  do {
    u = 2 * Math.random() - 1
    v = 2 * Math.random() - 1
  } while (u*u + v*v > 1 || (u === 0 && v === 0))

  s = u*u + v*v
  t = Math.sqrt((-2.0 * Math.log(s)) / s)

  return stddev * u * t + mean
  //val2 = stddev * v * t + mean
}

export default class {
  private layerCount: number
  private inputSize: number

  private layerSize: number[]
  private transferFunction: TransferFunction[]

  private layerOutput: number[][]
  private layerInput: number[][]
  private bias: number[][]
  private delta: number[][]
  private previousBiasDelta: number[][]
  
  private weight: number[][][]
  private previousWeightDelta: number[][][]

  constructor (initialBias: number | null, layerSizes: number[], transferFunctions: TransferFunction[]) {
    if (transferFunctions.length !== layerSizes.length || transferFunctions[0] !== TransferFunction.NONE) {
      throw new Error('[BPNetwork] Wrong constructor parameters')
    }
    
    this.layerCount = layerSizes.length - 1
    this.inputSize = layerSizes[0]

    this.layerSize = []
    this.transferFunction = []
    for (let i = 0; i < this.layerCount; i++) {
      this.layerSize[i] = layerSizes[i + 1]
      this.transferFunction[i] = transferFunctions[i + 1]
    }

    this.bias = []
    this.previousBiasDelta = []
    this.delta = []
    this.layerOutput = []
    this.layerInput = []
    this.weight = []
    this.previousWeightDelta = []

    for (let l = 0; l < this.layerCount; l++) {
      this.bias[l] = []
      this.previousBiasDelta[l] = []
      this.delta[l] = []
      this.layerOutput[l] = []
      this.layerInput[l] = []
      this.weight[l] = []
      this.previousWeightDelta[l] = []

      const n = l === 0 ? this.inputSize : this.layerSize[l - 1]
      for (let i = 0; i < n; i++) {
        this.weight[l][i] = []
        this.previousWeightDelta[l][i] = []
      }
    }

    for (let l = 0; l < this.layerCount; l++) {
      for (let j = 0; j < this.layerSize[l]; j++) {
        this.bias[l][j] = initialBias === null ? getRandomGaussian() : initialBias
        this.previousBiasDelta[l][j] = 0.0
        this.layerOutput[l][j] = 0.0
        this.layerInput[l][j] = 0.0
        this.delta[l][j] = 0.0
      }

      const n = l === 0 ? this.inputSize : this.layerSize[l - 1]
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < this.layerSize[l]; j++) {
          this.weight[l][i][j] = getRandomGaussian()
          this.previousWeightDelta[l][i][j] = 0.0
        }
      }
    }
  }

  start = (input: number[]) => {
    if (input.length !== this.inputSize) {
      throw new Error ('[BPNetwork.start] Wrong input dimesion')
    }

    // const outputLength = this.layerSize[this.layerCount - 1]
    let output: number[] = []
    for (let l = 0; l < this.layerCount; l++) {
      for (let j = 0; j < this.layerSize[l]; j++) {
        let sum = 0

        const n = l === 0 ? this.inputSize : this.layerSize[l - 1]
        for (let i = 0; i < n; i++) {
          const nOut = l === 0 ? input[i] : this.layerOutput[l - 1][i]
          sum += this.weight[l][i][j] * nOut
        }

        sum += this.bias[l][j]
        this.layerInput[l][j] = sum

        this.layerOutput[l][j] = evaluate(this.transferFunction[l], sum)
      }
    }

    for (let i = 0; i < this.layerSize[this.layerCount - 1]; i++) {
      output[i] = this.layerOutput[this.layerCount - 1][i]
    }

    return output
  }

  train = (input: number[], target: number[], rate: number, momentum: number, fn: TransferFunction): any => {
    if (input.length !== this.inputSize) {
      throw new Error ('[BPNetwork.train] Wrong input dimesion')
    }

    if (target.length !== this.layerSize[this.layerCount - 1]) {
      throw new Error ('[BPNetwork.train] Wrong target dimesion')
    }

    let error = 0
    let sum = 0
    let weightDelta = 0
    let biasDelta = 0

    const output = this.start(input)

    for (let l = this.layerCount - 1; l >= 0; l--) {
      // Output
      if (l === this.layerCount - 1) {
        for (let k = 0; k < this.layerSize[l]; k++) {
          let delta = output[k] - target[k]
          error += Math.pow(delta, 2)
          delta *= evaluateDerivative(this.transferFunction[l], this.layerInput[l][k])
          this.delta[l][k] = delta
        }
      } 
      // Hidden
      else {
        for (let i = 0; i < this.layerSize[l]; i++) {
          sum = 0
          for (let j = 0; j < this.layerSize[l + 1]; j++) {
            sum += this.weight[l + 1][i][j] * this.delta[l + 1][j]
          }
          sum *= evaluateDerivative(fn || this.transferFunction[l], this.layerInput[l][i])
          this.delta[l][i] = sum
        }
      }
    }

    for (let l = 0; l < this.layerCount; l++) {
      const n = l === 0 ? this.inputSize : this.layerSize[l - 1]
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < this.layerSize[l]; j++) {
          const dOut = l === 0 ? input[i] : this.layerOutput[l - 1][i]
          weightDelta = rate * this.delta[l][j] * dOut
          this.weight[l][i][j] -= weightDelta + momentum * this.previousWeightDelta[l][i][j]
          this.previousWeightDelta[l][i][j] = weightDelta
        }
      }
    }

    for (let l = 0; l < this.layerCount; l++) {
      for (let i = 0; i < this.layerSize[l]; i++) {
        biasDelta = rate * this.delta[l][i]
        this.bias[l][i] -= biasDelta + momentum * this.previousBiasDelta[l][i]

        this.previousBiasDelta[l][i] = biasDelta
      }
    }

    return { error, output }
  }
}