<template functional>
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="4993 112 20 20"
  :width="width"
  :height="height"
  :class="data.staticClass || ''"
>
    <g transform="translate(2047 879)">
      <path
        d="M13.221,14.28l-2.9-2.9A6.375,6.375,0,0,1,0,6.375H1.5A4.875,4.875,0,1,0,6.375,1.5,4.875,4.875,0,0,0,1.5,6.375H0a6.375,6.375,0,1,1,11.383,3.946l2.9,2.9a.75.75,0,0,1-1.061,1.061Z"
        transform="translate(2949 -764)"
      />
    </g>
  </svg>
</template>

<script>
export default {
  functional: true,
  name: 'SearchIcon',
  props: {
    width: Number,
    height: Number
  }
}
</script>
