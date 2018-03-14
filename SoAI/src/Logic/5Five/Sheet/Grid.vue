<template>
  <canvas style="pointer-events: none" />
</template>

<script>
export default {
  name: 'sheet',
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
    size () { this.drawGrid() },
    density () { this.drawGrid() }
  },
  mounted () {
    this.drawGrid()
  },
  methods: {
    drawGrid () {
      this.halfSize = this.size / 2

      const canvas = this.$el
      canvas.width = canvas.height = this.size
      this.context = canvas.getContext('2d')

      const ctx = this.context
      ctx.clearRect(0, 0, this.size, this.size)

      const lines = this.density
      const step = this.size / this.density

      ctx.beginPath()
      ctx.strokeStyle = `rgba(0, 0, 0, ${1 / this.density})`
      for (let i = 0; i < lines; i++) {
        const x = i * step
        ctx.moveTo(x - 0.5, 0)
        ctx.lineTo(x - 0.5, this.size + 0)

        ctx.moveTo(0, x - 0.5)
        ctx.lineTo(this.size + 0, x - 0.5)
      }
      ctx.stroke()
    }
  }
}
</script>
