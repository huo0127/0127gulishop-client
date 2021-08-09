<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="borrowMoneyFromXM(100)">找小明借钱100</button><br />
    <button @click="borrowMoneyFromXH(150)">找小红借钱150</button><br />
    <button @click="borrowMoneyFromALL(200)">找所有孩子借钱200</button><br />

    <br />
    <Son ref="son" />

    <br />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    borrowMoneyFromXM(money) {
      // 父親的錢要加
      this.money += money;
      // 兒子小明的錢要-100
      // this.$refs.son.money 可以直接拿到子組件對象，然後可以直接操作組件
      // 對象當中的數據
      //也可以直接調用子組件的方法
      this.$refs.son.money -= money;
    },
    borrowMoneyFromXH(money) {
      this.money += money;
      this.$refs.dau.money -= money;
    },
    borrowMoneyFromALL(money) {
      this.money += money * 2;

      //兒子女兒都要減去200
      // this.$children可以直接獲取這個父組件所有的子組件對象組成的數組
      // 這個方法雖然可以直接獲取到所有的子組件對象組成的數組，但是誰在前誰在後不一定
      console.log(this.$children);
      this.$children.forEach((item) => (item.money -= money));
      // this.$$children[0] 也不一定是誰，因此官方不建議使用和$parent
    },
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style></style>
