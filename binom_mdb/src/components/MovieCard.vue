<template>
  <div class="movie-card-wrapper">
    <router-link class="movie-card tile row no-default-a" :style="{ 'cursor': embedded && 'default' }" :to="`/movie/${id}`">
      <div
        class="movie-card__poster item-solid"
        :style="{ 'background-image': `url(${movie.poster_path})`}"
      >
        <div>{{ movie.vote_average | rating }}</div>
      </div>
      <div class="movie-card__content row item-shrink">
        <div class="item-shrink column">
          <div class="item-shrink ellipsis">{{ movie.title }}</div>
          <div class="interline ellipsis">{{ movie.release_date | year }}</div>
          <div class="genres interline" v-text="genres" />
          <div class="snuggle-bottom row vote">
            <user-icon width="18" height="18" />
            <span class="interline">{{ movie.vote_count }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import UserIcon from '@/components/icons/UserIcon.vue'

export default {
  name: 'MovieCard',
  components: { UserIcon },
  props: {
    id: {
      type: String,
      required: true
    },
    embedded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    movie () {
      const { getters } = this.$store
      return getters.getMovie(this.id) || {}
    },
    genres () {
      const { getters } = this.$store
      let names
      if (this.movie.genres) {
        names = this.movie.genres.map(genre => genre.name)
      }
      if (!names) {
        names = (this.movie.genre_ids || [])
          .map(id => (getters.getGenre(id) || {}).name)
      }
      return names.join(', ')
    }
  },
  filters: {
    year: value => {
      return (value || '').split('-')[0]
    },
    rating: value => {
      value = value + ''
      return value.length > 1 ? value : `${value}.0`
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-card-wrapper {
  padding: $base-offset * 2;
  padding-bottom: $base-offset;

  .movie-card {
    $height: 150px;
    height: $height;

    &__poster {
      position: relative;
      height: 100%;
      width: $height * 2/3;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: $page-background-color;
      border-radius: $block-radius;

      & > div {
        z-index: 1;
        position: absolute;
        top: 0.25em;
        left: 0.25em;
        color: white;
        font-size: 14px;
        font-weight: bold;
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-color: transparent;
        border-style: solid;
      }

      &::before {
        border-width: 1.45em;
        border-left-color: $tile-background-color;
        border-top-color: $tile-background-color;
      }

      &::after {
        border-radius: 0.4em;
        border-width: 1.35em;
        border-left-color: $primary-color;
        border-top-color: $primary-color;
      }
    }

    &__content {
      height: 100%;
      margin: $base-offset;
      align-items: stretch;

      .genres {
        margin-top: $base-offset;
      }

      .vote {
        & > span {
          margin-left: $base-offset / 2;
        }
      }

      & > .column {
        margin: $base-offset 0;
      }
    }
  }

  @media (max-width: 480px) {
    .movie-card {
      $height: 120px;
      height: $height;

      &__poster {
        width: $height * 2/3;
      }
    }
  }
}
</style>
