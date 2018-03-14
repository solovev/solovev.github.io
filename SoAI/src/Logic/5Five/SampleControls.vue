<template>
  <div class="subj flex-row-center">
    <input :value="value" type="text" :class="{ 'active': match }" @input="handleInput" />
    <div class="controls flex-row-center">
      <button @click="$bus.$emit('savePoints', { name: value })" :class="{ 'disabled': !value }" class="primary">Save</button>
      <button @click="$bus.$emit('clearPoints')" class="default">Clear</button>
    </div>
    <div class="actions flex-row-center">
      <button @click="$bus.$emit('explodePoints')" class="primary disabled">Explode</button>
      <button @click="$bus.$emit('movePoints', { x: 0, y: -1 })" class="move default">▲</button>
      <button @click="$bus.$emit('movePoints', { x: 1, y: 0 })" class="move default">▶</button>
      <button @click="$bus.$emit('movePoints', { x: 0, y: 1 })" class="move default">▼</button>
      <button @click="$bus.$emit('movePoints', { x: -1, y: 0 })" class="move default">◀</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sample-controls',
  props: {
    value: String,
    match: Boolean
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .subj {
    justify-content: space-between;
    width: 100%;

    input {
      border: 1px solid #e1e1e1;
      border-radius: 4px;
      padding: 5px;
      outline: none;
      box-shadow: none;
      color: var(--main-color);
      margin: 0 2px;

      &.active,
      &:focus {
        border-color: var(--primary-color);
      }
    }

    .controls {
      button {
        margin: 0 2px;
      }
    }

    .actions {
      .move {
        width: 28px;
        height: 28px;
        margin: 0 2px;
      }
    }
  }
</style>
