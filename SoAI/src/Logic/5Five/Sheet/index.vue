<template>
  <div 
    class="sheet"
    :style="sheetStyle"
    @dragstart.prevent="() => false"
    @mousemove="handleMouseMove"
    @mouseout="showNavigator = false"
    @click="handleClick"
  >
    <Grid :size="size" :density="density" />
    <Drawer ref="drawer" :size="size" :density="density" />
    <Navigator v-show="showNavigator" :size="pointSize" :x="activeX" :y="activeY" :removeMode="removeMode" />
  </div>
</template>

<script>
import _ from 'lodash'
import Grid from './Grid'
import Drawer from './Drawer'
import Navigator from './Navigator'

export default {
  name: 'sheet',
  components: { Grid, Drawer, Navigator },
  props: {
    size: {
      type: Number,
      required: true
    },
    pointsPerRow: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      removeMode: false,
      mouseDown: false,
      showNavigator: false,
      activeX: 0,
      activeY: 0
    }
  },
  created () {
    this.$watch(vm => [vm.size, vm.pointsPerRow].join(), this.recreatePoints)
  },
  mounted () {
    this.recreatePoints()

    this.windowKeyHandler = e => {
      const { ctrlKey, shiftKey } = e
      const value = ctrlKey || shiftKey
      this.removeMode = value

      if (e.type !== 'keydown') return
      const code = e.keyCode || e.which
      switch (code) {
        case 38: // top
          e.preventDefault()
          this.shiftPoints(0, -1)
          break
        case 40: // bottom
          e.preventDefault()
          this.shiftPoints(0, 1)
          break
        case 37: // left
          e.preventDefault()
          this.shiftPoints(-1, 0)
          break
        case 39: // right
          e.preventDefault()
          this.shiftPoints(1, 0)
          break
      }
    }
    window.addEventListener('keydown', this.windowKeyHandler)
    window.addEventListener('keyup', this.windowKeyHandler)

    this.windowMouseHandler = e => {
      this.mouseDown = e.type === 'mousedown'
    }
    window.addEventListener('mousedown', this.windowMouseHandler)
    window.addEventListener('mouseup', this.windowMouseHandler)

    this.handler = data => {
      if (!data.points) return

      this.points = JSON.parse(JSON.stringify(data.points))
      this.$refs.drawer.redraw(this.points)
    }
    this.$bus.$on('selectSample', this.handler)

    this.$bus.$on('movePoints', this.movePointsHandler = data => {
      const { x, y } = data
      this.shiftPoints(x, y)
    })

    this.$bus.$on('clearPoints', this.clearPointsHandler = () => {
      this.recreatePoints()
      this.$refs.drawer.redraw(this.points)
    })


    this.solveRequestFn = () => {
      this.$bus.$emit('solveRequest', this.points)
    }
    this.throttleSolveRequestFn = _.throttle(this.solveRequestFn, 100)
  },
  beforeDestroy () {
    this.$bus.$off('selectSample', this.handler)
    this.$bus.$off('movePoints', this.movePointsHandler)
    this.$bus.$off('clearPoints', this.clearPointsHandler)

    window.removeEventListener('keydown', this.windowKeyHandler)
    window.removeEventListener('keyup', this.windowKeyHandler)

    window.removeEventListener('mousedown', this.windowMouseHandler)
    window.removeEventListener('mouseup', this.windowMouseHandler)
  },
  computed: {
    sheetStyle () {
      return this.size ? { width: `${this.size}px`, height: `${this.size}px` } : {}
    },
    density () {
      return this.pointsPerRow
    },
    pointSize () {
      return this.size / this.density
    }
  },
  methods: {
    shiftPoints (shiftX = 0, shiftY = 0) {
      if (!shiftX && !shiftY) return

      const action = (i) => {
        const point = this.points[i]
        const { x, y, value } = point
        if (!value) return

        const shiftIndex = ((y + shiftY) * this.density) + (x + shiftX)

        const shiftPoint = this.points[shiftIndex]
        if (!shiftPoint) return

        shiftPoint.value = value
        point.value = 0
      }

      if (shiftX < 0 || shiftY < 0) {
        for (let i = 0; i < this.points.length; i++) action(i)
      } else {
        for (let i = this.points.length - 1; i >= 0; i--) action(i)
      }
      this.$refs.drawer.redraw(this.points)
    },
    getPoints () {
      return this.points
    },
    recreatePoints (pointsPerRow) {
      pointsPerRow = this.pointsPerRow

      const points = []
      const total = pointsPerRow * pointsPerRow
      for (let i = 0; i < total; i++) {
        const x = i % pointsPerRow
        const y = (i - x) / pointsPerRow

        points[i] = { x, y, value: 0 }
      }
      this.points = points
    },
    handleClick (event) {
      const { offsetX, offsetY } = event

      this.activeX = Math.floor(offsetX / this.pointSize)
      this.activeY = Math.floor(offsetY / this.pointSize)
      this.$refs.drawer.applyPoint(this.activeX, this.activeY, this.removeMode)
      this.setPointValue(this.activeX, this.activeY, this.removeMode ? 0 : 1)

      this.preActiveX = this.activeX
      this.preActiveY = this.activeY
    },
    handleMouseMove (event) {
      const { offsetX, offsetY } = event

      this.activeX = Math.floor(offsetX / this.pointSize)
      this.activeY = Math.floor(offsetY / this.pointSize)

      const same = this.activeX === this.preActiveX && this.activeY === this.preActiveY
      if (this.mouseDown && !same) {
        this.$refs.drawer.applyPoint(this.activeX, this.activeY, this.removeMode)
        this.setPointValue(this.activeX, this.activeY, this.removeMode ? 0 : 1)

        this.preActiveX = this.activeX
        this.preActiveY = this.activeY
      }

      this.showNavigator = true
    },
    setPointValue (x, y, value) {
      const index = (y * this.density) + x
      this.points[index] && (this.points[index].value = value)

      this.throttleSolveRequestFn()
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet {
  position: relative;

  & > * {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
