<template>
  <div class="account">

    <v-main class="grey lighten-3">
      <div style = "padding-left: 3vw; padding-right: 3vw">
      <v-container 

      fluid
      > 
      
        <v-row>
          <v-col>
            <v-card
              min-height="80vh"
              color="rgba(255,255,255,0.5)"
              rounded
            >
            
       
              <v-container center  grid-list-md>
                <v-layout align="center" justify="center" row wrap>
                  <v-flex
                  align="center"
                  justify="center"
                    md4
                    lg3
                    style="padding-top: 20px; padding-bottom: 20px"
                  v-for="n in 100" v-bind:key="n"
                  >
                  <v-card  
                    justify="center"
                    align="center"
                    class="mx-auto elevation-20"
                    color="rgba(255,255,255,0.5)"
                    dark
                    style="max-width:200px; max-height:200px; min-width:200px; min-height:200px"
                  >
                    <v-row justify="space-between">
                      <v-col cols="8">
                        <v-card-title primary-title>
                          <div>
                            <div style="font-weight: 500; color: black; word-break: normal;" v-text = "hello.itemName" class="headline"></div>
                            <div style="font-weight: 300; color: black; word-break: normal;" v-text = "hello.desc"></div>
                            <div style="font-weight: 300; color: black; word-break: normal;" v-text = "hello.desc"></div>
                          </div>
                        </v-card-title>
                      </v-col>
                    </v-row>
                  </v-card>
              </v-flex>
      </v-layout>












              </v-container>
              <!--  -->
            </v-card>
          </v-col>

          <v-col cols="2">
            <v-card 
            rounded
            color="rgba(255,255,255,0.5)"
            min-height="30vh">

            <div 
            v-for="n in 5"
            :key="n">
                
                <p>&#129409; {{n}}  </p>

              </div>
              
            </v-card>
          </v-col>

        </v-row>
      </v-container>
      </div>
    </v-main>


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
  data () {
    return {
      hello: {
        itemName: "Item Name",
        desc: "item info"
      }
    }
  },
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

<style scoped>

.card-container {
  height: 200px;
  width: 200px;  
}

</style>
