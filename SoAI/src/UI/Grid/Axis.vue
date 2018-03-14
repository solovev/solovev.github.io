<template>
  <div class="axis block-color" :class="{ 'horizontal': !vertical }">
    <div v-for="(dash, i) in values"
      class="dash block-color"
      :class="[dash.type, { 'hidden': dash.value === 0 }]"
      :key="dash.value"
      :style="{ top: `${(i) * step}px` }"
      :data-value="dash.type && dash.value"
    >

    </div>
  </div>
</template>

<script>
export default {
  name: 'axis',
  props: {
    points: {
      type: Array,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
    vertical: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    values () {
      let result = []

      for (let i of this.points) {
        const left = Math.abs(i % 1)
        result.push({
          value: i,
          type: left === 0 ? 'big' : (left === 0.5 ? 'medium' : undefined)
        })
      }

      return result
    }
  }
}
</script>

<style scoped>
  .dash {
    position: absolute;
    width: 8px;
    left: -3px;
    height: 1px;
  }

  .dash.big {
    width: 14px;
    left: -6px;
  }

  .dash.hidden {
    visibility: hidden;
  }

  .dash.medium::after,
  .dash.big::after {
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;

    position: absolute;
    content: attr(data-value);
    color: var(--main-color);
    /* transform: translate(-100%, -50%); */

    right: 0;
    transform: translateY(-50%);
    text-align: center;

    font-size: 10px;
  }

  .dash.big::after {
    right:  4px;
  }

  .dash.medium::after {
    right:  1px;
  }

  .horizontal .dash::after {
    transform: rotateZ(-90deg) translateX(50%) translateY(75%);
  }

  /* .horizontal .dash.::after {
    transform: translate(-100%, -50%) rotateZ(-90deg) translateY(300%);
  } */

  .axis {
    position: absolute;
    width: 2px;
    top: 0;
    bottom: 0;
    left: calc(50% - 1px);
    pointer-events: none;
  }

  .axis::before,
  .axis::after {
    content: '';
    position: absolute;
    left: -5px;
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  .axis::before {
    top: -6px;
    border-bottom: 6px solid var(--main-color);
  }

  .axis::after {
    top: 100%;
    border-top: 6px solid var(--main-color);
  }

  .axis.horizontal {
    transform: rotateZ(90deg);
  }
</style>
