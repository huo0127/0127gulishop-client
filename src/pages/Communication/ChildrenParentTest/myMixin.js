//定義混入
export default {
  methods: {
    giveMoney(money) {
      this.money += money;
      // this.$parent.money可以拿到父組件對象，操作父組件對象的數據
      this.$parent.money += money;
    },
  },
  mounted() {
    console.log(111);
  },
};
