<template>
  <div
    class="navigator"
    :style="{
      width: `${size}px`, height: `${size}px`,
      transform: `translate(${x * size}px, ${y * size}px)`,
      borderColor: `var(--${removeMode ? 'primary' : 'main'}-color)`,
      borderWidth: `${borderWidth}px`
    }"
  >

  </div>
</template>

<script>
export default {
  name: 'navigator',
  props: {
    size: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    removeMode: Boolean
  },
  computed: {
    borderWidth () {
      return Math.max(1, Math.floor(this.size / 25))
    }
  }
}
</script>

<style lang="scss" scoped>
.navigator {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;

  border-style: dashed;
  box-sizing: border-box;
}
</style>
