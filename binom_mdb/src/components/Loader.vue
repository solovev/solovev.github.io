<template>
  <div class="loader" :style="spinnerStyle"></div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    size: {
      type: String,
      default: '35px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: this.size,
        width: this.size,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: this.color + ' ' + this.color + ' transparent',
        borderRadius: this.radius,
        background: 'transparent'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loader {
  border-color: $primary-color $primary-color transparent;
  animation: loaderAnimation 0.75s 0s infinite linear;
  animation-fill-mode: both;
}

@-webkit-keyframes loaderAnimation {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
@keyframes loaderAnimation {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
