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
          <v-icon style="margin-right: 10px">mdi-google</v-icon>
          Sign In
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
/*eslint-disable */

import firebase from "firebase";
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
      var vm = this;
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    
        //set the user as logged-in in the state
        store.commit("setLoggedIn", true);

        //update uid in state
        store.commit("setUser", user.uid);



        router.push("/account");

       
        //fetch user items
        var fetchItems = firebase.functions().httpsCallable("fetchItems");
 

        fetchItems(vm.user.uid).then(result => {
          
          console.log(result.data);
          // store.commit("setItemData", result.data);
        })

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
    getUid: function(){
      return this.user.uid;
    }
  },

  created() {
    console.log(this.getUid());
    if(this.user.loggedIn) {
      router.push("/account");
    }
  },


}

/*eslint-enable */
</script>

