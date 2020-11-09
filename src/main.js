import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from "firebase/app"
// Required for side-effects

import {firebaseConfig} from './config.js'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
