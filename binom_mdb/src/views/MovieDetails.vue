<template>
  <div class="movie-details tile">
    <loader v-if="!movie" />
    <div v-else class="movie-details__content">
      <div class="banner row row--center" :style="{ 'background-image': `url(${movie.backdrop_path})`}">
        <movie-card :id="id" :embedded="true" />
      </div>
      <div v-if="movie.overview" class="info-block" data-caption="Overview">
        {{ movie.overview }}
      </div>
      <div v-if="movie.tagline" class="info-block" data-caption="Tagline">
        {{ movie.tagline }}
      </div>
      <div v-if="movie.homepage" class="info-block" data-caption="Homepage">
        <a :href="movie.homepage" target="_blank">{{ movie.homepage  }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_MOVIE } from '@/store/actions'
import Loader from '@/components/Loader.vue'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieDetails',
  components: { Loader, MovieCard },
  data () {
    return {}
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    movie () {
      const { getters } = this.$store
      return getters.getMovie(this.id)
    }
  },
  methods: {
    fetchData () {
      const { dispatch } = this.$store
      dispatch(LOAD_MOVIE, this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-details {
  margin-top: $base-offset * 2;
  padding: 0 0 ($base-offset * 2) 0;
  max-width: 748px;
  width: auto;
  overflow: hidden;

  .loader {
    margin: $base-offset * 2 auto;
  }

  &__content {
    position: relative;

    .movie-card-wrapper {
      position: relative;
      min-width: 280px;
      width: 100%;
      margin: 0;
      z-index: 1;
      align-self: flex-end;
    }

    .info-block {
      padding: $base-offset * 2;

      &::before {
        display: block;
        content: attr(data-caption);
        font-size: 1.5rem;
        padding-bottom: 0.5em;
        color: $faded-text-color;
      }

      & > a {
        color: $primary-color;
      }
    }

    .banner {
      position: relative;
      height: 420px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: $page-background-color;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          $tile-background-color 80%,
          $tile-background-color 100%
        );
      }
    }
  }
}
</style>
