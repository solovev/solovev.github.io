<template functional>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 11">
    <path :fill="props.fill" d="M14.32 1.79L12.54.07 5.96 7.32 2.3 3.57.66 5.21l5.3 5.53z" />
  </svg>
</template>

<script>
export default {
  functional: true,
  name: 'CheckIcon',
  props: {
    fill: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
