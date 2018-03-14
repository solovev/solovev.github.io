<template>
  <div class="points">
    <div v-for="p in points" :key="p.created"
      class="point act"
      :style="{
        width: `${getSize(p)}px`,
        height: `${getSize(p)}px`,
        backgroundColor: p.color,
        left: `${getX(p)}px`,
        top: `${getY(p)}px`
      }"
      :id="p.created"
      :class="{ test: p.color === '?' }"
      :data-x="p.x"
      :data-y="p.y"
      v-tooltip="{ text: `${p.x}, ${p.y}` }"
    >
    </div>
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
    points: {
      type: Array,
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
    getSize (p) {
      return this.step
    },
    getX (point) {
      return (this.halfSize + point.x * this.realStep) - this.halfStep
    },
    getY (point) {
      return (this.halfSize + point.y * -this.realStep) - this.halfStep
    }
  }
}
</script>

<style scoped>
  .points {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .point {
    z-index: 1;
    position: absolute;
    border-radius: 50%;
  }

  .point.test {
    border-radius: 0;
    /* border: 1px solid black; */
    box-shadow: 1px 1px black, -1px -1px black;
    box-sizing: content-box;
  }
</style>
