<template>
  <div
    class="movie-roster column"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="isListDisabled"
    infinite-scroll-distance="100"
  >
    <template v-if="chunks.length > 0">
      <div v-for="chunk in chunks" :key="getChunkKey(chunk)" class="row row--center">
        <movie-card v-for="id in chunk" :key="id" :id="id" />
      </div>
    </template>
    <template v-else-if="movies.length > 0">
      <movie-card v-for="id in movies" :key="id" :id="id" />
    </template>
    <div v-else-if="filter && !isLoading" class="tile empty">Sorry, no results for: {{ filter }}</div>
    <loader :style="{ 'visibility': isLoading ? 'visible' : 'hidden' }" class="loader" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { LOAD_MOVIES } from '@/store/actions'
import MediaQueryMatchMixin from '@/mixins/media-query-match.js'
import Loader from '@/components/Loader.vue'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieRoster',
  mixins: [MediaQueryMatchMixin], // Expose "isWideScreen" property
  components: { MovieCard, Loader },
  created () {
    this.loadMore()
  },
  watch: {
    $route: 'loadMore'
  },
  computed: {
    chunks () {
      const result = []
      if (this.isWideScreen && this.movies) {
        for (let i = 0; i < this.movies.length; i += 2) {
          let chunk
          const value = this.movies[i]
          const nextValue = this.movies[i + 1]
          value && (chunk = [value])
          nextValue && chunk.push(nextValue)
          chunk && result.push(chunk)
        }
      }
      return result
    },
    isListDisabled () {
      return this.isLoading || !this.hasMore
    },
    ...mapState({
      movies: state => state.movies.ids || []
    }),
    ...mapGetters(['hasMore', 'filter', 'isLoading'])
  },
  methods: {
    getChunkKey (chunk) {
      return chunk.join()
    },
    ...mapActions({
      loadMore: LOAD_MOVIES
    })
  }
}
</script>

<style lang="scss" scoped>
.movie-roster {
  align-items: stretch;

  .loader,
  .empty {
    margin: $base-offset * 2;
    align-self: center;
  }

  .empty {
    padding: $base-offset * 2;
    color: $faded-text-color;
  }
}
</style>
