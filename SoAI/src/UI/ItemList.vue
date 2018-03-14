<template>
  <div class="item-list">
    <div v-for="i in items" :key="i[keyField]">
      {{ displayFn(i) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-list',
  props: {
    items: {
      type: Array,
      required: true
    },
    display: {
      type: String | Function,
      required: true
    },
    keyField: {
      type: String,
      required: true
    },
    deleteIcon: Boolean
  },
  created () {
    this.displayFn = typeof this.display === 'function'
      ? this.display
      : (() => this.display)
  }
}
</script>

<style scoped>

</style>
