import Vue from "vue";
//@ 是一個別名, 是個小名, 代表的就是我們的src的路徑
import App from "@/App";
import router from "@/router";

Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");

new Vue({
  el: "#app",
  render: (h) => h(App),
  router, //我們所有組件內部都可以使用this.$router和this.$route
});
