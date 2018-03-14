<template>
  <div class="plots flex-column-center">
    <div class="plots flex-row-center flex-start">
      <div v-for="(points, i) in groups" :key="colors[i] || i" class="plot flex-column-center">
        <div class="quad" :style="{ backgroundColor: colors[i] || 'var(--primary-color)' }">
          {{ points.length }}
        </div>
        <table :width="tableWidth">
          <tr v-once>
            <th align="center">X</th>
            <th align="center">Y</th>
          </tr>
          <tr v-for="(point, i) in capPoints(points)" style="font-size: 12px" :key="i">
            <td align="center">{{ round(point[0]) }}</td>
            <td align="center">{{ round(point[1])  }}</td>
          </tr>
        </table>
      </div>
    </div>
    <CheckBox style="margin-top: 10px" label="Keep collapsed" v-model="keepCollapsed" />
  </div>
</template>

<script>
import CheckBox from '@/UI/CheckBox'

export default {
  name: 'plots',
  components: { CheckBox },
  props: {
    groups: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      default: () => ['var(--primary-color)', 'var(--main-color)']
    },
    width: {
      type: Number,
      default: 290
    },
    maxRows: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      keepCollapsed: true
    }
  },
  computed: {
    tableWidth () {
      return this.width / Math.max(this.groups.length, 1)
    }
  },
  methods: {
    round (value) {
      if (value > 10000) return '∞'
      else if (value < -10000) return '-∞'
      return Math.round(value * 100) / 100
    },
    capPoints (points) {
      return this.expand ? points : points.slice(0, this.keepCollapsed ? this.maxRows : Infinity)
    }
  }
}
</script>

<style scoped>
  .plot {

  }

  td {
      max-width: 50px; /* add this */
      white-space: nowrap;
      overflow: hidden;
  }

  .quad {
    padding: 3px;
    color: var(--text-color);
    border-radius: 3px;
    display: inline-block;
  }
</style>
