import { createPairs, createDecisionUnit } from './Pair'

export default {
  created () {
    this.pairColors = ['#ff9f43', '#00d2d3', '#ee5253', '#01a3a4', '#10ac84', '#5f27cd', '#8395a7']
  },
  data () {
    return {
      pairs: []
    }
  },
  mounted () {
    // this.startLearn()
  },
  methods: {
    solve () {
      const points = this.unknownPoints
      points.forEach(this.solvePoint)
    },
    solvePoint (point) {
      let resultPair = null

      let types = {}
      this.pairs.forEach(pair => {
        const probability = pair.getProbability(point)
        const type = pair.getType(point)

        const { a, b } = pair
        const p = Math.round(probability * 100) / 100
        // console.log(`[${a} vs ${b}]`, type, `(${p})`)

        types[type] = types[type] || 0
        types[type] += 1
      })

      const sorted = Object.keys(types).sort((a, b) => types[b] - types[a])
      const type = sorted[0]

      if (!type) throw new Error('[solvePoint] type is undefined')

      const index = this.points.indexOf(point)
      if (index < 0) throw new Error('[solvePoint] index < 0')

      this.$set(this.points, index, this.createPoint(point, type))
    },
    startLearn (callback) {
      const pairs = createPairs(this.usedTypes)
      pairs.forEach((pair, i) => {
        pair.prepare({
          speed: this.speed,
          bias: this.bias,
          data: this.points,
          color: this.pairColors[i] || '#000'
        })
      })

      this.pairs = pairs

      const step = () => {
        const drawData = []

        let same = true
        this.pairs.forEach(pair => {
          const sameIt = pair.step()
          same = same && sameIt
          drawData.push(pair.getDrawData())
        })
        this.$bus.$emit('step', drawData)

        if (same && this.untilReps) {
          callback && callback()
        }
      }

      const start = () => {
        this.currentIt = 0
        while (1) {
          step()
          if (!this.learning || this.currentIt > this.iterations) {
            callback && callback()
            break
          }
          this.currentIt++
        }
      }

      const startDelay = () => {
        this.currentIt = 0
        this.id = setInterval(() => {
          step()

          if (!this.learning || this.currentIt > this.iterations) {
            clearInterval(this.id)
            callback && callback()
            return
          }
          this.currentIt++
        }, this.delay)
      }

      this.$nextTick(this.delay > 0 ? startDelay : start)
    },
    clear () {
      if (this.learning) {
        return
      }
      clearInterval(this.id)
      this.currentIt = 0
      this.pairs = []
      this.$bus.$emit('step', null)
    }
  }
}
