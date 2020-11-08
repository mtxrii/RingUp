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
     
    },
    currentOrder: []
  },
  plugins: [createPersistedState()],
  getters: {
    user(state) {
      return state.user
    },
    items(state) {
      return state.data
    },
    current(state) {
      return state.currentOrder
    }
  },
  mutations: {
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, value) {
      state.user.uid = value;
    },
    setItemData(state, value) {
      state.data = value;
    },

    addToOrder(state, value) {
      state.currentOrder.push(value);
    },
    removeFromOrder(state, value) {
      for (let i = state.currentOrder.length; i >= 0; i--) {
        if (state.currentOrder[i] === value) {
          state.currentOrder.splice(i, 1);
          break;
        }
      }
    },

    clearOrder(state) {
      state.currentOrder = [];
    }
  },
  actions: {
  },
  modules: {
    
  }
})
