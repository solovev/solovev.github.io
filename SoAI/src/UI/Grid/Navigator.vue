<template>
  <div class="navigator" @mouseenter="handleMousePresence" @mouseleave="handleMousePresence" @mousemove="handleMouseMove">
    <canvas ref="canvas"></canvas>
    <div v-if="pointerVisible" :style="{ left: `${pointerX}px`, top: `${pointerY}px` }" class="pointer block-color little-round">
      <div :data-value="-this.points[this.activeXPoint]">X: </div>
      <div :data-value="this.points[this.activeYPoint]">Y: </div>
    </div>
    <template v-if="pointerVisible && showAxises">
      <div class="line horizontal"
        :style="{
          left: `${horizontalLineX}px`,
          top: `${horizontalLineY}px`,
          width: `${horizontalLineWidth}px`
        }"
      ></div>
      <div class="line vertical"
        :style="{
          left: `${verticalLineX}px`,
          top: `${verticalLineY}px`,
          height: `${verticalLineHeight}px`
        }"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'navigator',
  props: {
    points: {
      type: Array,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
    showAxises: {
      type: Boolean,
      default: true
    },
    activeXPoint: Number,
    activeYPoint: Number
  },
  data () {
    return {
      pointerVisible: false,
      pointerX: 0,
      pointerY: 0
    }
  },
  mounted () {
    this.drawGrid()
  },
  watch: {
    points () {
      this.drawGrid()
    },
    step () {
      this.drawGrid()
    }
  },
  computed: {
    horizontalLineX () {
      const x = this.activeXPoint * this.step
      return x < this.halfSize ? x : this.halfSize
    },
    horizontalLineY () {
      return this.activeYPoint * this.step
    },
    horizontalLineWidth () {
      const x = this.activeXPoint * this.step
      return x <= this.halfSize
        ? Math.abs(this.horizontalLineX - this.halfSize)
        : x - this.halfSize
    },

    verticalLineX () {
      return this.activeXPoint * this.step
    },
    verticalLineY () {
      const y = this.activeYPoint * this.step
      return y < this.halfSize ? y : this.halfSize
    },
    verticalLineHeight () {
      const y = this.activeYPoint * this.step
      return y <= this.halfSize
        ? Math.abs(this.verticalLineY - this.halfSize)
        : y - this.halfSize
    }
  },
  methods: {
    drawGrid () {
      this.size = (this.points.length - 1) * this.step
      this.halfSize = this.size / 2

      const { canvas } = this.$refs
      canvas.width = canvas.height = this.size
      this.context = canvas.getContext('2d')

      const ctx = this.context

      let lines = this.points.length - 1

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
    },
    handleMousePresence (event) {
      const isEnter = event.type === 'mouseenter'
      this.pointerVisible = isEnter
    },
    handleMouseMove (event) {
      this.pointerX = event.offsetX
      this.pointerY = event.offsetY
    }
  }
}
</script>

<style scoped>
  .line {
    position: absolute;
    background-color: var(--primary-color);
    pointer-events: none;
    user-select: none;
  }

  .line.vertical {
    width: 1px;
    transform: translateX(-1px);
  }

  .line.horizontal {
    height: 1px;
  }

  .pointer {
    position: absolute;
    display: inline-block;
    padding: 5px;

    pointer-events: none;
    user-select: none;
    transform: translateY(-125%);

    white-space: nowrap;
    z-index: 1;
  }

  .pointer > div::after {
    content: attr(data-value);
  }

  .navigator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
