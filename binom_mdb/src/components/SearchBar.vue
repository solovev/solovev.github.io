<template>
  <div class="search-bar tile row" :class="{ 'search-bar--focused': isFocused }">
    <div v-if="showBackButton" class="item-solid clickable" @click="$router.push({ path: '/' })">
      <arrow-icon class="arrow-icon" :mirror="true" />
    </div>
    <div class="item-solid" @click="$refs.input.focus()">
      <search-icon class="search-icon" />
    </div>
    <input
      ref="input"
      :value="filter"
      @input="filter = $event.target.value"
      type="text"
      class="item-stretch"
      @focus="isFocused = true"
      @blur="isFocused = false"
      placeholder="Search..."
    />
    <div class="item-solid row snuggle-right">
      <div v-if="filter" class="close-icon clickable item-solid" @click="filter = ''">
        <close-icon />
      </div>
    </div>
  </div>
</template>

<script>
import { SET_FILTER_VALUE } from '@/store/actions'

import { homeName } from '@/router'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'

export default {
  name: 'SearchBar',
  components: { SearchIcon, CloseIcon, ArrowIcon },
  data: () => {
    return {
      isFocused: false,
      showBackButton: false
    }
  },
  watch: {
    $route: {
      handler (route) {
        this.showBackButton = route.name !== homeName
      },
      immediate: true
    }
  },
  computed: {
    filter: {
      get () {
        return this.$store.state.settings.filter.trim()
      },
      set (value) {
        value = value.trim()
        if (this.filter === value) return

        this.$store.dispatch(SET_FILTER_VALUE, value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: $search-bar-height;
  border-radius: $block-radius * 3;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 0 $base-offset * 2;
  overflow: hidden;

  @media (min-width: 1280px) {
    $width: $max-tile-width * 2 + ($base-offset * 6);
    width: $width;
    max-width: $width;
    min-width: 0;
  }

  input {
    min-width: 0;
    height: 100%;
    margin-left: $base-offset;
  }

  $icon-size: $base-offset * 3;
  .search-icon {
    width: $icon-size;
    height: $icon-size;
  }

  .close-icon {
    margin-right: $base-offset;
    width: $icon-size - $base-offset;
    height: $icon-size - $base-offset;
    padding: $base-offset / 2;
  }

  .arrow-icon {
    width: $icon-size;
    height: $icon-size;
    margin-right: $base-offset;
  }

  &--focused {
    .search-icon {
      fill: $primary-color;
    }
  }
}
</style>
