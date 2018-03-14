<template>
  <div class="lines">
    <canvas ref="canvas" :width="size" :height="size"></canvas>
  </div>
</template>

<script>
export default {
  name: 'points',
  props: {
    step: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  mounted () {
    const { canvas } = this.$refs
    this.ctx = canvas.getContext('2d')

    this.$bus.$on('step', this.draw)
  },
  beforeDestroy () {
    this.$bus.$off('step', this.draw)
  },
  computed: {
    halfSize () {
      return this.size / 2
    },
    halfStep () {
      return this.step / 2
    },
    realStep () {
      return this.step * this.accuracy
    }
  },
  methods: {
    draw (data) {
      const { ctx } = this

      ctx.clearRect(0, 0, this.size, this.size)
      data && data.forEach(drawData => {
        const { p1, p2, color } = drawData
        ctx.beginPath();
        ctx.strokeStyle = color
        this.to(p1)
        this.to(p2, true)
        ctx.stroke();
      })
    },
    to (point, draw) {
      const { ctx } = this
      if (!draw) return ctx.moveTo(this.getX(point), this.getY(point))
      ctx.lineTo(this.getX(point), this.getY(point))
    },
    getX (point) {
      return (this.halfSize + point.x * this.realStep)
    },
    getY (point) {
      return (this.halfSize + point.y * -this.realStep)
    }
  }
}
</script>

<style scoped>
  .lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
