<template>
  <div class="home">
    
    <div class="my-2" @click="signIn">
      <v-btn 
        x-large 
        color="success" 
        dark>
        Sign In
      </v-btn>
    </div>

  </div>
</template>

<script>
/*eslint-disable */
import * as firebase from "firebase/app";
import firebaseui from "firebaseui";
import router from "../router";
import store from "../store";
import { mapGetters } from "vuex";
import createPersistedState from "vuex-persistedstate";

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export default {
  name: 'Home',
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
    }
  },

  created() {
    if(this.user.loggedIn) {
      router.push("/account");
    }
  },


}

/*eslint-enable */
</script>

