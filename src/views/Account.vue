<template>
  <div style = "padding-top: 70px;" class="account">

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
            
       
              <v-container  grid-list-md>
                <v-layout row wrap>
                  <v-flex
                  align="center"
                  justify="center"
                    md4
                    lg3
                    style="padding-top: 20px; padding-bottom: 20px"
                 
                  v-for="(item, key) in items" v-bind:key="key"
                  
                  >
                  <v-card  
                    class="mx-auto elevation-20"
                    color="rgba(255,255,255,0.5)"
                    dark
                    style="max-width:200px; max-height:200px; min-width:200px; min-height:200px;
                          justify-content: center; margin-left: 13%"
                          
                  >
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-card-title>
                          <div style = "color: black; text-align: center">
                            
                            <p></p>
                            <div style="font-size: 25px; text-align:center; font-weight: 500; color: black; word-break: normal; padding-bottom: 20%" v-text = "item[0].name" class="headline"></div>
                            <div style="font-size: 40px; font-weight: 500; color: black; word-break: normal;  padding-bottom: 20%" v-text = "item[0].icon" class="headline"></div>
                            
                              <v-btn
                                
                                elevation="2"
                                icon
                                outlined
                                rounded
                              ><v-icon>mdi-wrench</v-icon></v-btn>
                            
                            
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
      items: []
    }
  },
  mounted: function() {
    
      // this.items = Object.values(this.item_list);

      for(let i=0; i<this.item_list.length; i++){
        this.items[i] = Object.values(this.item_list[i]);
      }
    
  },
  computed: {
    ...mapGetters({ 
      user: "user",
      item_list: "items"
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
    // console.log(Object.values(this.item_list[0]));
    // // console.log(this.item_list[0][0]);

    console.log(this.items);
    console.log(this.hello);
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
