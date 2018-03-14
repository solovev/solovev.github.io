<template>
  <div>
    <div class="neurons-view flex-row-center">
      <RawGrid :step="10" :size="width" />

      <div 
        v-for="(neuron, index) in neurons"
        :key="neuron.key"
        class="neuron flex-row-center"
        :class="{ 'active': index === value }"
        :style="{
          backgroundColor: neuron.color,
          width: `${size}px`,
          height: `${size}px`,
          margin: `0 ${margin}px`,
          boxShadow: index === value ? `0 0 13px ${neuron.color}, 0 0 13px ${neuron.color}` : 'none'
        }"
        @click="$emit('input', index)"
      >
      </div>
    </div>
    <div class="viewer">
      <table width="290">
        <tr v-once>
          <th align="center">Neuron</th>
          <th align="center">W<sub>x</sub></th>
          <th align="center">W<sub>y</sub></th>
        </tr>
        <tr class="pair" v-for="(neuron) in neurons" :key="neuron.key">
          <td align="center">
            <div class="flex-row-center">
              <div class="quad" style="margin-right: 5px" :style="{ backgroundColor: neuron.color }"></div>
            </div>
          </td>
          <td align="center">{{ neuron.getWx() }}</td>
          <td align="center">{{ neuron.getWy() }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import RawGrid from '@/UI/Grid/RawGrid'

export default {
  name: 'neurons-view',
  components: { RawGrid },
  props: ['neurons', 'value', 'width'],
  computed: {
    size () {
      return Math.max(15, Math.min((this.width / 2) / this.neurons.length, 70))
    },
    margin () {
      return this.width / 4 / this.neurons.length
    }
  }
}
</script>

<style scoped>
  .neurons-view {
    width: 100%;
    position: relative;
    height: 90px;
    overflow: hidden;
    flex-wrap: nowrap;
  }

  .neurons-view canvas {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .neuron {
    border-radius: 50%;
    cursor: pointer;
  }

  .neuron.active {
    position: relative;
    z-index: 1;
  }

  .quad {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
  }
</style>
