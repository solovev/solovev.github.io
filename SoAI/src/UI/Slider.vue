<template>
  <div @mousedown="sliding = true" @mouseup="sliding = false" @mousemove="handleMove" :style="{ padding: `15px ${paddingX}px` }" @mouseenter="handleMousePresense" @mouseleave="handleMousePresense">
    <div :data-min="min" :data-max="max" class="slider little-round" :class="{ 'big': max > 9999 }" :style="{ width: `${width}px` }">
      <div class="thumb" ref="thumb" :style="{ left: `${thumbX}px` }">
          <div :data-description="value"  ref="anc">{{ valueLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from '@/UI/Popouts/Tooltip'

const ctx = '@@Tooltip'

export default {
  name: 'slider',
  props: {
    min: Number,
    max: Number,
    value: Number,
    width: {
      type: Number,
      default: 200
    },
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    min (min) {
      if (this.value < min) {
        this.$emit('input', min)
      }
    },
    max (max) {
      if (this.value > max) {
        this.$emit('input', max)
      }
    }
  },
  data () {
    return {
      sliding: false
    }
  },
  updated () {
    const { anc: thumb } = this.$refs
    if (!thumb) return

    const tooltip = thumb[ctx]
    if (!tooltip) return

    tooltip.updateContent()
  },
  computed: {
    valueLabel () {
      return this.value > 9999 ? '∞' : (this.value > 0 && this.value < 0.01 ? '~0' : this.value)
    },
    diff () {
      if (this.min < 0 && this.max > 0) return this.max + Math.abs(this.min)

      return this.max - this.min
    },
    thumbX () {
      // console.log( this.width * ((this.value + Math.abs(this.min)) / this.diff))
      // if (this.value === this.min) return 0
      // else if (this.value === this.max) return this.width
      // console.log((this.value - this.min) * (this.width / (this.max - this.min)))

      return (this.value - this.min) * (this.width / (this.max - this.min))
    }
  },
  created () {
    this.paddingX = 10
  },
  mounted () {
    this.setupTooltip()
    const { thumb } = this.$refs
    if (!thumb) return
  },
  methods: {
    handleMove (event) {
      if (!this.sliding) return

      let { offsetX } = event
      const x = offsetX - this.paddingX
      this.xToVal(x)
    },
    handleClick (event) {
      event.stopPropagation()

      let { offsetX } = event

      this.xToVal(offsetX - this.paddingX)
    },
    xToVal (x) {
      const step = x / this.width
      let value = step * this.diff + this.min

      // console.log(x, value)

      const factor = 1 / this.step
      value = Math.round(value * factor) / factor
      value = Math.max(this.min, Math.min(value, this.max))

      this.$emit('input', value)
      // return step * this.diff
    },
    setupTooltip () {
      const { anc: thumb } = this.$refs
      if (!thumb) return

      thumb[ctx] = new Tooltip({
        anchor: thumb,
        local: true,
        boundAncestor: document.body,
        cacheable: false
      })
    },
    handleMousePresense (event) {
      const isEnter = event.type === 'mouseenter'
      this.toggleTooltip(isEnter)

      if (!isEnter) this.sliding = false
    },
    toggleTooltip (value) {
      const { anc: thumb } = this.$refs
      if (!thumb) return

      const tooltip = thumb[ctx]
      if (!tooltip) return

      value ? tooltip.show() : tooltip.hide()
    }
  }
}
</script>

<style scoped>
  .slider {
    user-select: none;
    position: relative;
    height: 5px;
    background-color: var(--primary-color);
    z-index: 2;
    pointer-events: none;
  }

  .thumb {
    position: absolute;    
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: var(--text-color);
    border: 1px solid #e1e1e1;
    cursor: pointer;
    transform: translate(-50%, -12px);
    z-index: 1;
  }

  .thumb > div {
    width: 26px;
    height: 26px;
    pointer-events: none;

    font-size: 9px;
    color: #333;
    text-align: center;
    line-height: 26px;
    overflow: hidden;
  }

  .slider::after,
  .slider::before {
    position: absolute;
    content: attr(data-min);
    top: 7px;
    left: -5px;
    font-size: 9px;
    color: #b1b1b1;
  }

  .slider::after {
    content: attr(data-max);
    transform: translateX(100%);
    right: 0px;
    left: auto;
  }

  .slider.big::after {
    content: '∞';
    font-size: 14px;
    top: 2px;
  }
</style>
