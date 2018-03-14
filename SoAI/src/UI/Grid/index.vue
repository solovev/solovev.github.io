<template>
  <div class="grid" draggable="false" @dragstart.prevent.stop="() => { return false }" @click="handleClick" :style="{ width: `${size}px`, height: `${size}px` }" @mousemove="handleMouseMove">
    <template v-if="showAxises">
      <Axis :points="points" :step="step" />
      <Axis :points="points" :step="step" :vertical="false" />
    </template>

    <Points v-if="activePoints && showPoints" :size="size" :accuracy="accuracy" :step="step" :points="activePoints" />
    <Lines v-show="showLines" :size="size" :accuracy="accuracy" :step="step" />
    <Navigator :showAxises="showAxises" v-if="showNavigator" :activeXPoint="activeXPoint" :activeYPoint="activeYPoint" :points="points" :step="step" />

    <div v-if="showControls" class="flex-row-center controls" @click.stop="(e) => { return false }">
      <CheckBox v-model="showAxises" label="Axises" />
      <CheckBox v-model="showPoints" label="Points" />
      <CheckBox v-model="showNavigator" label="Navigation" />
      <CheckBox v-model="showLines" label="Lines" />
    </div>
  </div>
</template>

<script>
import Axis from './Axis'
import Navigator from './Navigator'
import Points from './Points'
import Lines from './Lines'

import CheckBox from '@/UI/CheckBox'

export default {
  name: 'grid',
  components: { Axis, Navigator, Points, Lines, CheckBox },
  props: {
    max: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      default: 10
    },
    activePoints: {
      type: Array,
      default: null
    },
    showControls: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeXPoint: 0,
      activeYPoint: 0,

      showAxises: true,
      showPoints: true,
      showNavigator: true,
      showLines: true
    }
  },
  computed: {
    size () {
      return this.max * 2 * this.step * this.accuracy
    },
    points () {
      let result = []

      const step = 1 / this.accuracy
      for (let i = this.max; i >= -this.max; i -= step) {
        result.push(Math.round(i * this.accuracy) / this.accuracy)
      }
      result.push(-this.max)

      return result
    },
    pointSize () {
      return this.size / this.points.length
    }
  },
  methods: {
    handleClick (e) {
      const { target } = e
      if (target && target instanceof HTMLElement) {
        e.preventDefault()
        e.stopPropagation()
        const attrX = target.getAttribute('data-x')
        const attrY = target.getAttribute('data-y')
        if (attrX && attrY) {
          this.$emit('clickAt', { x: +attrX, y: +attrY })
          return false
        }
      }
      const x = -this.points[this.activeXPoint]
      const y = this.points[this.activeYPoint]
      this.$emit('clickAt', { x, y })
    },
    handleMouseMove (event) {
      let { offsetX, offsetY, target } = event
      if (target.getAttribute('data-x')) {
        offsetX += target.offsetLeft
        offsetY += target.offsetTop
      }

      offsetX = Math.max(offsetX, 0)
      offsetY = Math.max(offsetY, 0)

      const x = Math.floor(offsetX / this.pointSize)
      const y = Math.floor(offsetY / this.pointSize)

      this.activeXPoint = x
      this.activeYPoint = y
    }
  }
}
</script>

<style scoped>
  .grid {
    position: relative;
    margin-bottom: 30px;
  }

  .controls {
    position: absolute;
    top: 100%;
    width: 100%;
    padding: 10px 0;

    justify-content: space-between;
  }
  
</style>
