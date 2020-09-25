<template>
  <div id="app">
    <v-app-bar color="deep-purple accent-4" dark>

      <v-toolbar-title>RingUP</v-toolbar-title>

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
