import Vue from "vue";
//@ 是一個別名, 是個小名, 代表的就是我們的src的路徑
import App from "@/App";
import router from "@/router";
import store from "@/store";

import "swiper/css/swiper.css"; //引入swiper.css

import "@/mock/mockServer"; //引入mockServer 讓模擬的接口生效

// import "@/api";

// 第二種測試接口請求函數方式
// import { reqCategoryList } from "@/api";
// reqCategoryList();

import TypeNav from "@/components/TypeNav";
import SlideLoop from "@/components/SlideLoop";
//全局註冊的組件, 如果一個非路由組件被多個組件使用, 那麼定義在components, 註冊在全局
Vue.component("TypeNav", TypeNav);
Vue.component("SlideLoop", SlideLoop);

Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");

new Vue({
  el: "#app",
  render: (h) => h(App),
  router, //我們所有組件內部都可以使用this.$router和this.$route
  store, //註冊上我們所有組件都可以拿到this.$store
});
