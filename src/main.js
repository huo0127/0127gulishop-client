import Vue from "vue";

//@ 是一個別名, 是個小名, 代表的就是我們的src的路徑
import App from "@/App";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
