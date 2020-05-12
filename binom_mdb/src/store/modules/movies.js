import Vue from 'vue'
import axios from 'axios'
import api from '@/api'
import { LOAD_MOVIE, LOAD_MOVIES, SET_FILTER_VALUE } from '@/store/actions'

const SET_PAGE_LOADING_STATE = 'SET_PAGE_LOADING_STATE'
const SET_MOVIE_LOADING_STATE = 'SET_MOVIE_LOADING_STATE'
const SET_FILTERING_STATE = 'SET_FILTERING_STATE'
const CLEAR_PAGE_DATA = 'CLEAR_PAGE_DATA'

const CancelToken = axios.CancelToken
let source

export default {
  state: () => ({
    data: {},
    isPageLoading: {},
    isMovieLoading: {},
    isFiltering: false,
    page: 0,
    totalPages: 0,
    ids: []
  }),
  getters: {
    getMovie: state => id => state.data[id],
    hasMore: state => state.page < state.totalPages,
    isLoading: state => Object.keys(state.isPageLoading).length > 0
  },
  mutations: {
    [LOAD_MOVIES] (state, { order, page, totalPages }) {
      state.data = { ...state.data, ...order.data }
      state.ids = [...state.ids, ...order.ids]
      state.page = page || 0
      state.totalPages = totalPages || 0
    },
    [LOAD_MOVIE] (state, movie) {
      movie = Object.assign({}, state.data[movie.id] || {}, movie)
      Vue.set(state.data, movie.id, movie)
    },
    [CLEAR_PAGE_DATA] (state) {
      state.ids = []
      state.page = 0
      state.totalPages = 0
    },
    [SET_PAGE_LOADING_STATE] (state, { key, value }) {
      value = !!value
      if (!value) {
        Vue.delete(state.isPageLoading, key)
      } else {
        Vue.set(state.isPageLoading, key, value)
      }
    },
    [SET_MOVIE_LOADING_STATE] (state, { id, value }) {
      value = !!value
      if (!value) {
        Vue.delete(state.isMovieLoading, id)
      } else {
        Vue.set(state.isMovieLoading, id, value)
      }
    },
    [SET_FILTERING_STATE] (state, value) {
      state.isFiltering = !!value
    }
  },
  actions: {
    async [SET_FILTER_VALUE] (context, value) {
      context.commit(CLEAR_PAGE_DATA)
      context.commit(SET_FILTERING_STATE, true)
      await context.dispatch(LOAD_MOVIES, { query: value })
      context.commit(SET_FILTERING_STATE, false)
    },
    async [LOAD_MOVIE] (context, id) {
      context.commit(SET_PAGE_LOADING_STATE, { id, value: true })
      try {
        source && source.cancel('New request initiated')
        source = CancelToken.source()

        const payload = await api.getMovie({ id, token: source.token })
        context.commit(LOAD_MOVIE, payload)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('[Request canceled]', e.message)
        } else {
          console.error(e)
        }
      }
      context.commit(SET_PAGE_LOADING_STATE, { id, value: false })
    },
    async [LOAD_MOVIES] (context, params) {
      let { page, query } = params || {}
      page = page || context.state.page + 1
      query = query || context.getters.filter

      const loadingKey = `${query}_${page}`
      const isLoading = context.state.isPageLoading[loadingKey]
      if (isLoading) return

      context.commit(SET_PAGE_LOADING_STATE, {
        key: loadingKey,
        value: true
      })
      try {
        source && source.cancel('New request initiated')
        source = CancelToken.source()

        const payload = await api.getMovies({
          page,
          query,
          token: source.token
        })
        context.commit(LOAD_MOVIES, payload)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('[Request canceled]', e.message)
        } else {
          console.error(e)
        }
      }
      context.commit(SET_PAGE_LOADING_STATE, {
        key: loadingKey,
        value: false
      })
    }
  }
}
