<template>
  <ul class="flex-row-center flex-content-start">
    <li 
      v-for="(t, i) in types"
      class="type flex-row-center act"
      :style="{ backgroundColor: t }"
      :class="{ 'test': t === '?' }"
      :key="t"
      @click="$emit('input', i)"
      ref="types"
      v-tooltip="t === '?' && { text: 'Проверочное множество' }"
    >

    </li>
    <div v-if="carretX" class="carret" :style="{ transform: `translate(${carretX}px, ${carretY}px)` }"></div>
  </ul>
</template>

<script>
export default {
  name: 'TypePicker',
  props: ['types', 'value'],
  data () {
    return {
      carretX: 0,
      carretY: 0
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.setCarretPosition()
      })
    }
  },
  mounted () {
    this.setCarretPosition()
  },
  methods: {
    setCarretPosition () {
      const { types } = this.$refs
      if (!types) return

      const type = types[this.value]
      if (!type) return

      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = type

      this.carretX = offsetLeft + offsetWidth / 2 - 7.5
      this.carretY = offsetTop + offsetHeight / 2 - 7.5
    }
  }
}
</script>

<style scoped>
  .type {
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 10px;
    font-size: 1.3rem;
    margin: 5px;
    font-size: 30px;
    cursor: pointer;
  }

  .carret {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--text-color);
    transition: transform 0.1s ease-in-out;
  }
</style>
