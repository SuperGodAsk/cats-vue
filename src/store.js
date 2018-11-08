import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeCat: null,
  },
  mutations: {
    setActiveCat(state, cat){
      state.activeCat = cat
    }
  },
  actions: {

  }
})
