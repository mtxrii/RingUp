import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
    },
    data: {
     
    }
  },
  plugins: [createPersistedState()],
  getters: {
    user(state) {
      return state.user
    },
    items(state) {
      return state.data
    }
  },
  mutations: {
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, value){
      state.user.uid = value;
    },
    setItemData(state, value){
      state.data = value;
    }
  },
  actions: {
  },
  modules: {
    
  }
})
