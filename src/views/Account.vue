<template>
  <div style = "padding-top: 70px;" class="account">
     
    <v-main class="grey lighten-3; newBackground">
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
            
       
              <v-container grid-list-md>
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
                        <div v-on:click="openModal(item[0])">
                          <v-card-title style = "color: black;">
                            {{item[0].name}}
                          </v-card-title>
                          <v-card-title style = "font-size: 45px; color: black; ">
                            {{item[0].icon}}
                          </v-card-title>
                        </div>
                            <v-dialog
                            width="500"
                          >
                            <template v-slot:activator="{ on }">
                 
                              <v-btn
                                v-on="on"
                                color="black"
                                elevation="2"
                                icon
                                outlined
                                rounded
                              ><v-icon>mdi-wrench</v-icon></v-btn>
                              </template>

                              <v-card>
                          <v-card-title class="headline grey lighten-2">
                           Edit Item Details
                          </v-card-title>
                          <v-container>
                          <v-row>
                          <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-card-text style="font-size: 22px">Edit Name:</v-card-text>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                            <v-text-field v-model="item[0].name" ></v-text-field>
                              
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                            >
                          <v-card-text style="font-size: 22px">Edit Price:</v-card-text>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                              <v-text-field
                                  v-model="item[0].price"
                                  type="number"
                                  prefix="$"
                                ></v-text-field>
                                
                              </v-col>
              
           
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-card-text style="font-size: 22px">Edit Icon:</v-card-text>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                              <v-text-field readonly v-model="item[0].icon"></v-text-field>
                                
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-card-text>
                          </v-card-text>
                          <VEmojiPicker @select="selectEmoji" />
                          <v-divider></v-divider>
 
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red"
                              text
                             
                              @click="edit(key); dialog=false"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                            </v-dialog>
                         
                      </v-col>
                    </v-row>
                  </v-card>

                   


              </v-flex>



             
               <v-flex
                  align="center"
                  justify="center"
                    md4
                    lg3
                    style="padding-top: 20px; padding-bottom: 20px"
                  >
                   <v-dialog
                      v-model="dialog"
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
  
                  <v-card  
                    v-bind="attrs"
                    v-on="on"
                    class="mx-auto elevation-20"
                    color="rgba(255,255,255,0.5)"
                    dark
                    style="max-width:200px; max-height:200px; min-width:200px; min-height:200px;
                          justify-content: center; margin-left: 13%"
                          
                  >
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-card-title style = "color: black;">
                          
                        </v-card-title>
                        <v-card-title style = "font-size: 45px; color: black; ">
                          
                        </v-card-title>
                       
                              <v-btn
                                color="black"
                                elevation="2"
                                icon
                                outlined
                                rounded
                              ><v-icon>mdi-plus</v-icon></v-btn>
                         
                      </v-col>
                    </v-row>
                  </v-card>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            New Item
                          </v-card-title>
                          <v-container>
            <v-row>
             <v-col
                cols="12"
                sm="6"
              >
                <v-card-text style="font-size: 22px">Item Name:</v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-text-field v-model="currentName" ></v-text-field>
                
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-card-text style="font-size: 22px">Item Price:</v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-text-field
                  v-model="currentPrice"
                  type="number"
                  prefix="$"
                ></v-text-field>
                
              </v-col>
              
           
              <v-col
                cols="12"
                sm="6"
              >
                <v-card-text style="font-size: 22px">Choose an Icon:</v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-text-field readonly v-model="currentEmoji"></v-text-field>
                
              </v-col>
            </v-row>
          </v-container>
                          <v-card-text>
                          </v-card-text>
                          <VEmojiPicker @select="selectEmoji" />
                          <v-divider></v-divider>
 
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red"
                              text
                             
                              @click="addItem();"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
        
                 </v-flex>

      </v-layout>


      

            
              </v-container>
            
            </v-card>
          </v-col>

          <v-col cols="2">
            <v-card 
            rounded
            color="rgba(255,255,255,0.5)"
            min-height="30vh">

              <div v-for="(item, key) in queue" v-bind:key="key">
                  
                <div style="text-align: left">
                  {{item.icon}} {{item.name}}
                </div>
                <div style="text-align: right; margin-top: -23px; margin-bottom: 5px; margin-right: 3px">
                  ${{item.price}}
                  <v-btn style="margin-left: 2px"
                    v-on:click="removeFromOrder(item)"
                    color="black"
                    elevation="2"
                    icon
                    outlined
                    rounded
                    small
                  ><v-icon small>mdi-delete</v-icon></v-btn>
                </div>

              </div>

              
            </v-card>

            <v-card 
            rounded
            color="rgba(255,255,255,0.5)"
            style="margin-top: 30px">

              <div style="padding-top: 10px; padding-left: 12px; text-align: left">
                <h3>Subtotal: ${{subtotal}}</h3>
              </div>

              <div class="ru-btn" style="margin-right: 20px; margin-bottom: 10px; margin-top: 10px">
                <v-btn
                  small
                  color="red"
                  @click="clearOrder()" >
                  <v-icon style="margin-right: 10px">mdi-delete-sweep</v-icon>
                  clear
                </v-btn>
              </div>

              <div class="ru-btn" style="margin-bottom: 10px; margin-top: 10px">
                <v-btn
                  small
                  color="green"
                  @click="clearOrder()" >
                  <v-icon style="margin-right: 10px">mdi-check</v-icon>
                  Checkout
                </v-btn>
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
import { VEmojiPicker } from 'v-emoji-picker';


// @ is an alias to /src


export default {
  name: 'Account',
   components: {
    VEmojiPicker
  },
  data () {
    return {
      items: [],
      currentItem: {},
      subtotal: 0,
      currentEmoji: "",
      currentName: "",
      currentPrice: 0,
      dialog: false
    }
  },

  computed: {
    ...mapGetters({ 
      user: "user",
      item_list: "items",
      queue: "current"
    }),
    listUpdates (){
      return this.items;
    }
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

    openModal: function(item) {
      this.currentItem = item
      this.addToOrder()
    },
    editCustom: function(key, val) {
      this.currentItem.options[key] = val
    },
    addToOrder: function() {
      store.commit("addToOrder", this.currentItem)
      this.subtotal += this.currentItem.price;
    },
    removeFromOrder: function(item) {
      store.commit("removeFromOrder", item);
      this.subtotal -= this.item.price;
    },
    clearOrder: function() {
      store.commit('clearOrder');
      this.subtotal = 0;
    },

    selectEmoji(emoji) {
      this.currentEmoji = emoji.data;
    },
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate();
    },
    addNewItem: function(){
      var vm = this;
      console.log("ADDING NEW ITEM");
      
      let dataToPush = {name: this.currentName, emoji: this.currentEmoji, price: this.currentPrice, uid: this.user.uid};

      var addItem = firebase.functions().httpsCallable("addItem");
      this.dialog = false;

        addItem(dataToPush).then(result => {
          var fetchItems = firebase.functions().httpsCallable("fetchItems");

          fetchItems(vm.user.uid).then(result => {
    
            store.commit("setItemData", result.data);
          
            for(let i=0; i<vm.item_list.length; i++){
              this.items[i] = Object.values(vm.item_list[i]);
            }
            this.methodThatForcesUpdate();
          })         
        })
    },
    edit: function(index){
      var vm = this;
      console.log("EDIT ITEM");


      console.log(index);
      console.log(vm.items[index][0].name);
      let itemId = Object.keys(this.item_list[index]);

      let dataToPush = {name: this.items[index][0].name, emoji: this.items[index][0].icon, price: this.items[index][0].price, uid: vm.user.uid, id: itemId}
      console.log(dataToPush);
      var editItem = firebase.functions().httpsCallable("editItem");

      editItem(dataToPush).then(result => {
        var fetchItems = firebase.functions().httpsCallable("fetchItems");

          fetchItems(vm.user.uid).then(result => {
    
            store.commit("setItemData", result.data);
          
            for(let i=0; i<vm.item_list.length; i++){
              this.items[i] = Object.values(vm.item_list[i]);
            }
            this.methodThatForcesUpdate();
          })         
      })

    }
    
  },

  created() {
    
    if(!this.user.loggedIn) {
      router.push("/");
    }

    for(let i=0; i<this.item_list.length; i++){
      this.items[i] = Object.values(this.item_list[i]);
    }
    console.log(this.items);
    
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
