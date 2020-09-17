<template>
  <div>
      <h1>Account page</h1>
  </div>
</template>

<script>
import store from '../store'

import router from "../router";
// @ is an alias to /src


export default {
  name: 'Account',

  created() {
    if (store.state.user.loggedIn) {
      router.push("/");
    }
  },



}



</script>
