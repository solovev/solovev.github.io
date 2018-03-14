<template>
  <div class="thumbnail" :style="{ width: `${size}px`, height: `${size}px` }" @click.stop="handleClick">
    <canvas ref="canvas" :width="size" :height="size" />
  </div>
</template>

<script>
export default {
  name: 'thumbnail',
  props: ['points', 'size', 'group', 'index'],
  created () {
    this.$watch(vm => [vm.size, vm.points, vm.group, vm.index].join(), () => {
      this.redraw(this.points)
    })

    const bodyStyles = window.getComputedStyle(document.body)
    this.style = bodyStyles.getPropertyValue('--main-color')
  },
  mounted () {
    this.redraw(this.points)
  },
  computed: {
    density () {
      return Math.sqrt(this.points.length)
    },
    pointSize () {
      return this.size / this.density
    }
  },
  methods: {
    handleClick (e) {
      e.stopPropagation()
      const alt = e.ctrlKey || e.shiftKey

      alt
        ? this.$bus.$emit('removeSample', { group: this.group, index: this.index })
        : this.$bus.$emit('selectSample', { points: this.points, group: this.group, index: this.index })
    },
    clear () {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.size, this.size)
    },
    redraw (points) {
      points = points || this.points
      this.clear()

      const ctx = this.$refs.canvas.getContext('2d')
      ctx.fillStyle = this.style

      const size = this.pointSize
      points.forEach(point => {
        const { x, y, value } = point
        value && ctx.fillRect(x * size, y * size, size, size)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #eee;
  cursor: pointer;

  canvas {
    position: absolute;
  }
}
</style>
