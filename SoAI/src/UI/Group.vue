<template>
  <div :style="{ 'width': width ? `${width}px` : 'auto' }" :class="{ 'disabled': disabled, 'error': error, 'active': active }" class="group little-round flex-row-center">
    <div class="namelabel" v-html="name"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'group',
  props: ['name', 'disabled', 'error', 'width', 'active']
}
</script>

<style scoped>
  .group {
    background-color: var(--text-color);
    position: relative;
    justify-content: flex-start;
    padding: 15px;
    border: 1px solid #e1e1e1;
  }

  .group.disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  .group.active {
    border-color: var(--primary-color);
  }

  .group.active .namelabel {
    color: var(--primary-color) !important;
  }

  .group.error {
    border-color: #eb4d4b;
  }
  .group.error .namelabel {
    color: #eb4d4b !important;
  }

  .group .namelabel {
    text-transform: capitalize;
    border-radius: 5px;
    content: attr(data-name);
    position: absolute;
    top: 0;
    left: 15px;
    transform: translate(-3px, -50%);
    background-color: var(--text-color);
    padding: 0 3px;
    color: #b1b1b1;
    justify-self: flex-start !important;
  }
</style>
