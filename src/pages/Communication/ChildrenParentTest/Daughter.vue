<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{ money }}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin";

export default {
  name: "Daughter",
  mixins: [myMixin],
  data() {
    return {
      money: 20000,
    };
  },
  // mounted() {
  //   console.log(111);
  // },

  // methods: {
  //   giveMoney(money) {
  //     this.money += money;
  //     // this.$parent可以拿到父組件對象，操作父組件對象的數據
  //     // this.$parent可以拿到一個父組件對象沒問題，如果這個子組件有多個父組件，那麼就出問題。
  //     this.$parent.money += money;
  //   },
  // },
};
</script>
