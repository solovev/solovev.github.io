<template>
  <Group :width="290" :name="caption" class="preview">
    <div class="container flex-column-center">
      <Group class="group" :active="activeSampleGroup.toLowerCase() === key" :width="250" v-for="(value, key) in samples" :key="key" :name="`${key} (Count: ${value.length})`">
        <Thumbnail
          v-for="(points, i) in value"
          :points="points"
          :group="key"
          :key="getKey(points, key)"
          :index="i"
          :size="20"
        />
      </Group>
    </div>
  </Group>
</template>

<script>
import Group from '@/UI/Group/'
import Thumbnail from './Thumbnail'

export default {
  name: 'samples-preview',
  components: {
    Group, Thumbnail
  },
  props: ['samples', 'activeSampleGroup'],
  computed: {
    caption () {
      return `Samples (Types: ${Object.keys(this.samples).length})`
    }
  },
  methods: {
    getKey (points, key) {
      let result = key
      points.forEach((point, index) => {
        const { value, x, y } = point
        if (!value) return

        result += String.fromCharCode(index) + (x + y) + value
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
  .preview {
    .container {
      & > * {
        margin: 5px;
      }

      .group {
        flex-wrap: wrap;
        & > * {
          margin-right: 4px;
          margin-top: 4px;
        }
      }
    }
  }
</style>
