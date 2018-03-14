import _ from 'lodash'

let worker

export default {
  mounted () {
    worker = new Worker('webworker.js');

    worker.addEventListener('message', (e) => {
      const { key, data } = e.data
      switch (key) {
        case 'stepResult': {
          this.currentIt++
          if (!this.learning || this.currentIt > this.iterations) {
            this.stop()
            break
          }
          this.step()
          break
        }
        case 'predictResult': {
          this.result = data
        }
      }
    }, false);

    window.start = () => this.start(true)
    window.solve = () => this.solve()

    this.$bus.$on('solveRequest', (points) => {
      this.solve(points)
    })
  },
  beforeDestroy () {
    this.$bus.$off('solveRequest')
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
      worker.postMessage({
        key: 'createNetwork',
        data: {
          nInput: this.nInput,
          nHidden: this.nHidden,
          nOutput: this.nOutput,
          rate: this.speed
        }
      })
    },
    stop () {
      this.learning = false
    },
    generateSet () {
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
      return _.shuffle(trainingSet)
    },
    solve (points) {
      if (this.learning || this.currentIt === 0) return

      points = points || this.$refs.sheet.getPoints()
      const input = points.map(point => point.value)

      worker.postMessage({
        key: 'predict',
        data: { input }
      })
    },
    step () {
      worker.postMessage({
        key: 'trainStep',
        data: { set: _.shuffle(this.generateSet()) }
      })
    },
    start (single = true) {
      this.learning = true

      this.currentIt === 0 && this.createNetwork()
      this.step()
    },
    clear () {
      if (this.learning) return

      this.currentIt = 0
      this.result = null
    }
  }
}