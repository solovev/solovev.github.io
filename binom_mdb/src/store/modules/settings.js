import { SET_FILTER_VALUE } from '@/store/actions'

export default {
  state: () => ({
    filter: ''
  }),
  mutations: {
    [SET_FILTER_VALUE] (state, value) {
      state.filter = value || ''
    }
  },
  actions: {
    [SET_FILTER_VALUE] (context, value) {
      context.commit(SET_FILTER_VALUE, value)
    }
  }
}
