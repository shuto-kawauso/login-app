import Vue from 'vue'
import Vuex from 'vuex'
import product from './product'
import view from './view'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    view
  }
})
