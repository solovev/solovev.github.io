<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="7370 2047 24 24"
    :width="width"
    :height="height"
    :class="data.staticClass || ''"
  >
    <g transform="translate(4094 2956)">
        <path d="M16.68,18.27,9.3,10.89,1.92,18.27A1.125,1.125,0,1,1,.33,16.679L7.71,9.3.331,1.92,1.922.33,9.3,7.708,16.679.33,18.27,1.92,10.891,9.3l7.38,7.379A1.125,1.125,0,0,1,16.68,18.27Zm0-17.94A1.125,1.125,0,1,1,18.27,1.92ZM.331.33a1.123,1.123,0,0,1,1.59,0L.331,1.92A1.123,1.123,0,0,1,.331.33Z" transform="translate(3278.378 -906.622)"/>
      </g>
  </svg>
</template>

<script>
export default {
  functional: true,
  name: 'CloseIcon',
  props: {
    width: Number,
    height: Number
  }
}
</script>
