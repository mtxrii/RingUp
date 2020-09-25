<template>
  <div class="home">

    <div class="ru-card">
      <h1>RingUP</h1>
      <h4>Modern Invoice Generator and Receipt Tracker</h4>
      <br> <br>
      <div class="ru-btn">
        <v-btn
          x-large 
          color="success" 
          dark
          @click="signIn" >
          Sign In
        </v-btn>
      </div>
    </div>

  </div>
</template>

<style>
.home {
  text-align: center;
  background-image: linear-gradient( 135deg, #FFAA85 10%, #B3315F 100%);
  height: 100vh;
}

.ru-card {
  text-align: center;
  display: inline-block;
  padding: 50px;
  margin: 50px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 60%);
}

.ru-btn {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}

.ru-btn:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 100%;
  bottom: 0;
  background: #2098D1;
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
</style>

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

