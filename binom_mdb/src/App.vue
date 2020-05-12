<template>
  <div id="app">
    <div class="logo clickable" @click="$router.push({ path: '/' })">B</div>
    <search-bar />
    <router-view />
  </div>
</template>

<script>
import { LOAD_GENRES } from '@/store/actions'
import SearchBar from '@/components/SearchBar.vue'
import { mapGetters } from 'vuex'
import { homeName } from '@/router'
export default {
  name: 'App',
  components: { SearchBar },
  watch: {
    filter (value) {
      if (value && this.$route.name !== homeName) {
        this.$router.push({ name: homeName })
      }
    }
  },
  created () {
    const { dispatch } = this.$store
    dispatch(LOAD_GENRES)
  },
  computed: {
    ...mapGetters(['filter'])
  }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

#app {
  position: relative;
  height: calc(100% - #{$search-bar-height});
  padding-top: $search-bar-height;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  $polygon: polygon(0 0, 0 100%, 100% 0);
  @supports (clip-path: $polygon) {
    &::before {
      // content: "";
      position: fixed;
      z-index: -1;
      left: 0;
      right: 0;
      height: 356px;
      background-color: $primary-color;
      clip-path: $polygon;
    }
  }

  .logo {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: $base-offset * 2 $base-offset * 4;
    color: $tile-background-color;
    font-size: 4.5rem;
    font-weight: bold;
    color: $primary-color;
    display: none;

    @media (min-width: 1280px) {
      display: block;
    }
  }
}
</style>
