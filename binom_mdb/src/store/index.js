import Vue from 'vue'
import Vuex from 'vuex'

import Movies from '@/store/modules/movies'
import Genres from '@/store/modules/genres'
import Settings from '@/store/modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    filter: state => state.settings.filter
  },
  modules: {
    settings: Settings,
    movies: Movies,
    genres: Genres
  }
})
