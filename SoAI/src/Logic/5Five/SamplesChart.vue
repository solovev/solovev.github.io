<template>
  <div class="chart flex-column-center">
    <transition-group name="flip-list" tag="div" class="flex-column-center">
      <div v-for="(value, i) in sortedData"
        :key="value.name"
        class="item flex-row-center"
        :class="{ 'top': i === 0 }"
      >
        <div class="name">{{ value.name }}</div>
        <div class="percent">{{ value.percent }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'chart',
  props: ['outputs', 'result'],
  created () {
    this.defaultSortP = (keyA, keyB) => {
      const outputA = this.outputs[keyA]
      if (!outputA) return -1

      const outputB = this.outputs[keyB]
      if (!outputB) return 1

      const maxIndexA = outputA.indexOf(Math.max(...outputA))
      const maxIndexB = outputB.indexOf(Math.max(...outputB))

      return maxIndexB - maxIndexA
    }
  },
  computed: {
    list () {
      return Object.keys(this.outputs).map(key => key)
    },
    groupsByMaxIndex (index) {
      const result = {}
      Object.keys(this.outputs).forEach(key => {
        const output = this.outputs[key]
        const maxIndex = output.indexOf(Math.max(...output))
        result[maxIndex] = key
      })
      return result
    },
    sortedData () {
      if (!this.result) return this.list.sort(this.defaultSortP).map(key => {
        return {
          name: key, value: 0, percent: 0
        }
      })

      let result = this.result.map((value, index) => {
        const name = this.groupsByMaxIndex[index]
        return { name, value, percent: Math.round(value * 100) }
      })

      return result.sort((a, b) => b.value - a.value)
    }
  }
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

  .chart {
    width: 100%;
  }

  .name,
  .percent {
    width: 100px;
  }

  .name {
    text-transform: capitalize;
  }

  .percent {
    text-align: center;
  }

  .percent::after {
    content: "%";
  }

  .top {
    border-bottom: 1px solid var(--primary-color);
    margin-bottom: 5px;
  }

  .top .percent {
    color: var(--primary-color);
  }
</style>
