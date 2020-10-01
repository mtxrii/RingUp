<template>
  <div class="home">

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

    <v-timeline
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        :color="item.color"
        :icon="item.icon"
        fill-dot
      >
        <v-card
          :color="item.color"
          dark
        >
          <v-card-title class="title">
            Lorem Ipsum Dolor
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
            <v-btn
              :color="item.color"
              class="mx-0"
              outlined
            >
              Button
            </v-btn>
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
  data: () => ({
    items: [
      {
        color: 'red lighten-2',
        icon: 'mdi-star',
      },
      {
        color: 'purple darken-1',
        icon: 'mdi-book-variant',
      },
      {
        color: 'green lighten-1',
        icon: 'mdi-airballoon',
      },
      {
        color: 'indigo',
        icon: 'mdi-buffer',
      },
    ],
  }),
  
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
  right: 0;
  padding-left: 20px;
  padding-right: 20px;
}
</style>