<template>
  <div class="account">
    <h1>Account page</h1>

    <div class="my-2" @click="signOut">
      <v-btn 
        x-large 
        color="success" 
        dark>
        Sign Out
      </v-btn>
    </div>


  </div>
</template>

<script>
/*eslint-disable */
import * as firebase from "firebase/app";
import 'firebase/firebase-database';
import createPersistedState from "vuex-persistedstate";
import store from '../store'
import router from "../router";
import { mapGetters } from "vuex";

// @ is an alias to /src


export default {
  name: 'Account',

  computed: {
    ...mapGetters({
      user: "user",
      items: "items"
    })
  },
  
  methods: {
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

  created() {
    if(!this.user.loggedIn) {
      router.push("/");
    }
  },
}

/*eslint-enable */
</script>
