<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="7742 2039 40 40"
    :width="props.width"
    :height="props.height"
    :class="data.staticClass || ''"
    :style="{ 'transform' : props.mirror && 'rotateZ(-180deg)' }"
  >
    <g transform="translate(8687 5280) rotate(-90)">
      <path
        d="M14.719,16.948.461,2.693,2.693.463,15.834,13.6,28.974.463l2.23,2.23L16.948,16.948a1.572,1.572,0,0,1-2.23,0ZM28.974.463a1.577,1.577,0,0,1,2.23,2.23ZM.461.463a1.577,1.577,0,0,1,2.232,0L.461,2.693A1.578,1.578,0,0,1,.461.463Z"
        transform="translate(3205.166 -933.333)"
      />
    </g>
  </svg>
</template>

<script>
export default {
  functional: true,
  name: 'ArrowIcon',
  props: {
    width: String,
    height: String,
    mirror: Boolean
  }
}
</script>
