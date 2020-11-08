<template>
  <div class="home" style="margin-top: 300px">

    <div class="ru-background" style="position: relative">
      <v-img src="../assets/undraw/shopping_app.svg"> </v-img>

      <div class="ru-card floating">
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

    <v-timeline style="margin: 10%; margin-top: -10%" align-top>
      <v-timeline-item large>
        <template v-slot:icon>
          <h2>1</h2>
        </template>
        
        <v-card class="elevation-2" width="500" height="300">
          <v-card-title class="headline">
            Add your items for sale
          </v-card-title>
          <v-img src="../assets/undraw/selected_options.svg" width="40%" style="margin: 0 auto"></v-img>
          <v-card-text class="body-1">
            Add any product to your menu and assign an emoji to it. Customize price, options and notes.
          </v-card-text>
        </v-card>
      </v-timeline-item>
      
      <v-timeline-item large>
        <template v-slot:icon>
          <h2>2</h2>
        </template>
        
        <v-card class="elevation-2" width="500" height="320">
          <v-card-title class="headline">
            Create a new order by adding items
          </v-card-title>
          <v-img src="../assets/undraw/selecting.svg" width="40%" style="margin: 0 auto"></v-img>
          <v-card-text class="body-1">
            Quickly and accurately add your customer's requests to their order. Easily customize items with the settings you've already determined, or add special notes.
          </v-card-text>
        </v-card>
      </v-timeline-item>
      
      <v-timeline-item large>
        <template v-slot:icon>
          <h2>3</h2>
        </template>
        
        <v-card class="elevation-2" width="500" height="360">
          <v-card-title class="headline">
            Analyze trends and data
          </v-card-title>
          <v-img src="../assets/undraw/memory_storage.svg" width="40%" style="margin: 0 auto"></v-img>
          <v-card-text class="body-1">
            At checkout, a copy of the customer's receipt is saved for your reference, along with every past order. We then analyze your data and present trends on popular, frequent and most often modified products.
          </v-card-text>
          
        </v-card>
      </v-timeline-item>
    </v-timeline>

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
  data: () => ({ drawer: null }),
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
          
          store.commit("setItemData", result.data);
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
    
    if(this.user.loggedIn) {
      router.push("/account");
    }
  },


}

/*eslint-enable */
</script>

<style scoped>
.ru-card.floating {
  position: absolute;
  bottom: 55%;
  left: 60%;
}
</style>