<template>
  <div class="viewer">
    <table width="290">
      <tr v-once>
        <th>Pair</th>
        <th align="center">W<sub>1</sub></th>
        <th align="center">W<sub>2</sub></th>
        <th align="center">Bias</th>
      </tr>
      <tr class="pair" v-for="(pair) in pairs" :key="getPairKey(pair)">
        <td>
          <div class="flex-row-center" style="justify-content: flex-start">
            <div class="quad" style="margin-right: 5px" :style="{ backgroundColor: pair.color }"></div>
            -
            <div class="flex-row-center" style="justify-content: space-between; margin-left: 5px">
              <div class="quad" :style="{ backgroundColor: types[pair.a] }"></div>
              <div style="padding: 0 3px">vs</div>
              <div class="quad" :style="{ backgroundColor: types[pair.b] }"></div>
            </div>
          </div>
        </td>
        <td align="center">{{ round(pair.w1) }}</td>
        <td align="center">{{ round(pair.w2) }}</td>
        <td align="center">{{ round(pair.bias) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'pairs-viewer',
  props: ['pairs', 'types'],
  methods: {
    getPairKey (pair) {
      return this.types[pair.a] + this.types[pair.b]
    },
    round (value) {
      return Math.round(value * 100) / 100
    }
  }
}
</script>

<style scoped>
  .pair {
    padding-top: 3px;
    font-size: 12px;
  }

  .quad {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
  }
</style>
