<template>
  <ul class="switcher flex-row-center">

    <li v-for="(item, index) in data"
      :key="item.key"
      :data-number="index + 1"
      class="lab-item flex-row-center block-color act"
      :class="{ 'block-color-active': value === item.key }"  
      v-tooltip="{ text: item.title }"
      @click="setValue(item.key)"
    >
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'lab-switcher',
  props: ['value', 'data'],
  watch: {
    value () {
      try {
        localStorage.setItem('currentLab', this.value)
      } catch (e) {}
    }
  },
  mounted () {
    let stored: string | null = ''
    try {
      stored = localStorage.getItem('currentLab')
    } catch (e) {}

    let index = 0

    if (stored) {
      const keys = this.data.map((item: any) => item.key)
      const indexStored = keys.indexOf(stored)
      if (indexStored !== -1) {
        index = indexStored
      }
    }
    this.setValue(this.data[index].key)
  },
  methods: {
    setValue(key: string) {
      this.$emit('input', key)
    }
  }
})
</script>

<style scoped>
  .switcher {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 20px 0;
    background-color: #fff;
  }

  .lab-item {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    font-size: 1.3rem;
    margin: 0 15px;
    cursor: pointer;
  }

  .lab-item::after {
    content: attr(data-number);
  }
</style>
