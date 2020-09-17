<template>
  <div>
      <h1>Account page</h1>
    <div class="my-2" @click="signOut">
      <v-btn 
      x-large 
      color="success" 
      dark
      >Sign Out</v-btn>
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
  methods: {
    signOut: function(event){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.

    //Set state to signed out
    store.commit("setLoggedIn", false);
    router.push("/");
    }).catch(function(error) {
    // An error happened.
    console.log("sign out error");
    });
    },
  }
}


/*eslint-enable */

</script>
