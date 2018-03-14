<template>
  <canvas ref="canvas" :width="size" :height="size"></canvas>
</template>

<script>
export default {
  name: 'raw-grid',
  props: ['size', 'step'],
  mounted () {
    this.drawGrid()
  },
  watch: {
    size () {
      this.drawGrid()
    },
    step () {
      this.drawGrid()
    }
  },
  methods: {
    drawGrid () {
      this.halfSize = this.size / 2

      const { canvas } = this.$refs
      canvas.width = canvas.height = this.size
      this.context = canvas.getContext('2d')

      const ctx = this.context
      ctx.clearRect(0, 0, this.size, this.size)

      let lines = this.size / this.step

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)'
      for (let i = 0; i < lines; i++) {
        const x = i * this.step
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

<style>

</style>
