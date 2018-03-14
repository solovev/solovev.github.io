<template>
  <canvas :width="size" :height="size" style="pointer-events: none" />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 500
    },
    density: {
      type: Number,
      default: 10
    }
  },
  watch: {
    size () { this.clear() },
    density () { this.clear() }
  },
  created () {
    const bodyStyles = window.getComputedStyle(document.body)
    this.style = bodyStyles.getPropertyValue('--main-color')
  },
  computed: {
    pointSize () {
      return this.size / this.density
    }
  },
  methods: {
    clear () {
      const ctx = this.$el.getContext('2d')
      ctx.clearRect(0, 0, this.size, this.size)
    },
    redraw (points) {
      this.clear()

      const ctx = this.$el.getContext('2d')
      ctx.fillStyle = this.style

      const size = this.pointSize
      points.forEach(point => {
        const { x, y, value } = point
        value && ctx.fillRect(x * size, y * size, size, size)
      })
    },
    applyPoint (x, y, remove) {
      const ctx = this.$el.getContext('2d')
      const size = this.pointSize

      if (remove) {
        ctx.clearRect(x * size, y * size, size, size)
        return
      }

      ctx.fillStyle = this.style
      ctx.fillRect(x * size, y * size, size, size)
    }
  }
}
</script>