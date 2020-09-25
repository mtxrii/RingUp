<template>
  <div id="app">
    <v-app-bar color="deep-purple accent-4" dark>

      <v-toolbar-title style="font-family: 'Roboto', sans-serif">RingUP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="user.loggedIn" icon @click="signOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn v-else icon @click="signIn">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

    <router-view/>
  </div>
</template>

<script>
/*eslint-disable */
import * as firebase from "firebase/app";
import firebaseui from "firebaseui";
import router from "./router";
import store from "./store";
import { mapGetters } from "vuex";
import createPersistedState from "vuex-persistedstate";

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export default {
  name: 'App',
  components: {
    
  },

  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {
    signIn: function(event){
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        store.state.user.loggedIn = true;

        //set the user as logged-in in the state
        store.commit("setLoggedIn", true);
        router.push("/account");

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },

    signOut: function(event){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.

        // Set state to signed out
        store.commit("setLoggedIn", false);

        // Send user to home
        router.push("/");
      }).catch(function(error) {
        // An error happened.
        console.log("sign out error");
      });
    },
  },


};
/*eslint-enable */
</script>

<style>
body {
  text-align: center;
  background-image: linear-gradient( 135deg, #FFAA85 10%, #B3315F 100%);
  height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.ru-card {
  text-align: center;
  display: inline-block;
  padding: 50px;
  margin: 50px;
  border-radius: 15%;
  background-color: rgba(255, 255, 255, 60%);
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
}

.ru-btn {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  padding-bottom: 3px;
}

.ru-btn:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 100%;
  bottom: 0;
  background: #b34b31;
  height: 4px;
  -webkit-transition-property: right;
  transition-property: right;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.ru-btn:hover:before, .ru-btn:focus:before, .ru-btn:active:before {
  right: 0;
}

.ru-head {
  color: whitesmoke;
  text-shadow: 1px 1px 3px black;
  font-size: 300%;
  margin: 30px;
}

.ru-head.ru-sub {
  font-size: 200%;
  margin: 20px;
}
</style>