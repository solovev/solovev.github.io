import { LOAD_GENRES } from '@/store/actions'
import { movie_genres as movieGenres, tv_genres as tvGenres } from '@/store/data/genres.json'
import api from '@/api'

export default {
  state: () => ({
    data: { ...tvGenres, ...movieGenres }
  }),
  getters: {
    getGenre: state => id => state.data[id]
  },
  mutations: {
    [LOAD_GENRES] (state, map) {
      state.data = { ...state.data, ...map }
    }
  },
  actions: {
    async [LOAD_GENRES] (context) {
      try {
        const payload = await api.getGenres()
        context.commit(LOAD_GENRES, payload)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
