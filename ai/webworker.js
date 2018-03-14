importScripts('matrix.js', 'network.js')

// const trainigSet = [
//   {
//     input: [0, 0],
//     target: [0]
//   },
//   {
//     input: [1, 1],
//     target: [0]
//   },
//   {
//     input: [0, 1],
//     target: [1]
//   },
//   {
//     input: [1, 0],
//     target: [1]
//   }
// ]

// const network = new NeuralNetwork(2, 2, 1)

// for (let i = 0; i < 50000; i++) {
//   const { input, target } = trainigSet[Math.floor(Math.random()*trainigSet.length)];
//   network.train(input, target)
// }

// for (var data of trainigSet) {
//   const { input } = data
//   let guess = network.predict(input)
//   self.postMessage(guess)
// }
let network

self.addEventListener('message', function (e) {
  const { key, data } = e.data
  switch (key) {
    case 'createNetwork': {
      const { nInput, nHidden, nOutput, rate } = data
      network = new NeuralNetwork(nInput, nHidden, nOutput)
      network.setLearningRate(rate)
      break
    }
    case 'trainStep': {
      const { set } = data
      for (let trainData of set) {
        const { input, output } = trainData
        const result = network.train(input, output)
      }
      self.postMessage({ key: 'stepResult', data: null })
      break
    }
    case 'predict': {
      const { input } = data
      const result = network.predict(input)
      self.postMessage({ key: 'predictResult', data: result })
      break
    }
    case 'clear': {
      network = null
      break
    }
    default: {
      self.postMessage(e.data)
    }
  }
}, false)   