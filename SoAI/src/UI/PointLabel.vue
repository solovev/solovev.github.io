<template>
  <div @click="click && click({ x: p.x, y: p.y })" @mouseenter="handleMousePresense" @mouseleave="handleMousePresense" class="point little-round act" :style="{ backgroundColor: p.color }"
    :class="{ test: p.color === '?' }"
  >
    <div class="content flex-row-center">{{ p.x }}<span></span>{{ p.y }}</div>
  </div>
</template>

<script>
import Tooltip from '@/UI/Popouts/Tooltip'

export default {
  name: 'point',
  props: ['p', 'click'],
  mounted () {
    this.$nextTick(() => {
      this.setupLink()
    })
  },
  methods: {
    setupLink () {
      this.linkGridPoint = this.linkGridPoint || document.getElementById(this.p.created + '')
    },
    handleMousePresense (event) {
      if (!this.linkGridPoint) return

      const isEnter = event.type === 'mouseenter'
      
      const context = this.linkGridPoint['@@Tooltip']
      if (!this.linkGridPoint || !context) return

      if (isEnter) {
        if (!context.tooltipData) {
          const anchor = this.linkGridPoint
          const { content, flank, local, cacheable, options } = context
          context.tooltipData = new Tooltip({ anchor, content, flank, local, shared: !local, options, cacheable })
        }
        context && context.tooltipData.show()
      } else {
        context && context.tooltipData.hide()
      }
    }
  }
}
</script>

<style scoped>
  .point {
    height: 14px;
    color: var(--text-color);
    padding: 3px 5px;
    margin: 3px;
    font-size: 12px;
    user-select: none;
  }


  .point .content {
    position: relative;
    height: 14px;
    z-index: 1;
  }

  .point.test {
    position: relative;
    color: var(--main-color);
  }

  .point.test::before {
    content: '';
        position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--text-color);
    opacity: 0.7;
    z-index: 0;
  }

  .point .content span {
    display: inline-block;
    width: 1px;
    height: 100%;
    margin: 0 4px;
    background-color: var(--text-color);
    opacity: 0.2;
  }
</style>
