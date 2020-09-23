import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    }
  },
  plugins: [createPersistedState()],
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
  },
  actions: {
  },
  modules: {
    
  }
})
