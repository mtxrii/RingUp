<template>
  <div class="receipt">
    {{text}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Receipt',
  data () {
    return {
      text: ""
    }
  },

  computed: {
    ...mapGetters({
      queue: "current",
      total: "totalOrders"
    })
  },

  methods: {
    printReceipt: function(shopName){
      const bar = "================================";
      const barLenHalf = Math.round(bar.length / 2);
      const nameLen = shopName.length;
      const padLen = Math.round(barLenHalf - (nameLen / 2)) - 1;
      const paddedName = " ".repeat(padLen) + shopName;
      let total = 0;

      let text = 
      `
  ${bar}
  ${paddedName}
  ${" ".repeat(barLenHalf)}-
           Order No. ${this.total}
  ${bar}`;

      this.queue.forEach(element => {
        text +=
      `
  ${element.name.padEnd(barLenHalf)}${('$' + element.price).padStart(barLenHalf)}`;
        total += parseInt(element.price);
      });

      text += '\n  ' + bar + '\n  ' + "Subtotal:".padEnd(barLenHalf) + ('$' + total).padStart(barLenHalf);



      return text;

    },
  },
  
  created() {
    this.text = this.printReceipt('Simple Shop');
  }
}
</script>

<style scoped>
.receipt {
  background-color: white;
  min-height: 100vh;
  font-family: "Courier New";
  text-align: left;
  white-space: pre-wrap;
}
</style>