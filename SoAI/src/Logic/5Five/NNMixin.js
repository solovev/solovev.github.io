var synaptic = require('synaptic');

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

export default {
  mounted () {
    // const worker = new Worker('webworker.js');

    // worker.addEventListener('message', function(e) {
    //   console.log('Worker said: ', e.data);
    // }, false);
    
    // worker.postMessage('Hello World')

    window.start = () => {
      this.start(true)
    }

    window.solve = () => this.solve()
  },
  computed: {
    samplesKeys () {
      return Object.keys(this.samples)
    },
    outputs () {
      const result = {}
      for (let i in this.samplesKeys) {
        const key = this.samplesKeys[i]

        const array = []
        for (let j in this.samplesKeys) {
          array[j] = +(i === j)
        }
        result[key] = array
      }
      return result
    }
  },
  methods: {
    createNetwork () {
      // [this.nInput, this.nHidden, this.nOutput]
      // const network = new Network()
      // network.addLayer(this.nHidden, this.nInput)
      // network.addLayer(this.nOutput)

      // return network

      this.network = new Perceptron(this.nInput, this.nHidden, this.nOutput);
      this.trainer = new Trainer(this.network);
    },
    stop () {
      this.learning = false
    },
    makeStep () {
      // this.samplesKeys.forEach(group => {
      //   const samples = this.samples[group]
      //   const output = this.outputs[group]

      //   samples.forEach(sample => {
      //     const input = sample.map(point => point.value)
      //     network.train([
      //       [input, output]
      //     ])
      //     // network.train(input, output, this.speed, this.momentum, this.activationFn)
      //   })
      // })

      const trainingSet = []
      this.samplesKeys.forEach(group => {
        const samples = this.samples[group]
        const output = this.outputs[group]

        samples.forEach(sample => {
          trainingSet.push({
            input: sample.map(point => point.value),
            output
          })
        })
      })

      this.trainer.train(trainingSet,{
        rate: this.speed,
        iterations: this.iterations,
        error: this.error,
        shuffle: true,
        log: this.iterations / 10,
        cost: Trainer.cost.MSE || Trainer.cost.CROSS_ENTROPY
      });
    },
    solve () {
      if (this.learning || !this.network) return

      const points = this.$refs.sheet.getPoints()
      const input = points.map(point => point.value)

      this.result = this.network.activate(input)
    },
    start (single = true) {
      this.learning = true

      this.createNetwork()

      setTimeout(() => {
        for (let i = 0; i < this.iterations; i++) {
          this.currentIt++
          
          if (!this.learning) break
          this.makeStep()

          if (single) break
        }
        this.stop()
      }, 100)
    },
    clear () {
      if (this.learning) return

      this.network = null
      this.currentIt = 0
      this.result = null
    }
  }
}