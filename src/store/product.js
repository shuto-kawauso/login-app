import product from '@/api/products.js'

export default {
  namespaced: true,
  state: {
    detail: {},
    review: { 'test': 'test' }
  },
  getters: {
    detail: state => state.detail,
    review: state => state.review
  },
  mutations: {
    set (state, { detail }) { state.detail = detail },
    setReview (state, { review }) { state.review = review },
    clear (state) {
      state.detail = {}
      // state.review = {}
    }
  },
  actions: {
    load ({ commit }, id) {
      product.asyncFind(id, detail => {
        commit('set', { detail })
      })
    },
    loadReview ({ commit }, payload) {
      product.asyncFindReview(payload.id, payload.rid, review => {
        commit('setReview', { review })
      })
    },
    destroy ({ commit }) {
      commit('clear')
    }
  }
}
