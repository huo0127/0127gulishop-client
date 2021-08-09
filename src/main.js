import Vue from "vue";
//@ 是一個別名, 是個小名, 代表的就是我們的src的路徑
import App from "@/App";
import router from "@/router";
import store from "@/store"; //只是簡寫
// import { default as store } from "@/store"; //全寫

import "swiper/css/swiper.css"; //引入swiper.css

import "@/mock/mockServer"; //引入mockServer 讓模擬的接口生效

import * as API from "@/api"; //直接獲取接口請求函數街口暴露出來的對象

import { Button, MessageBox, Message, Input } from "element-ui";

import "@/utils/validate"; //引入vee-validate相關配置

//圖片懶加載
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
// 在圖片介面還沒有進入到可視範圍前不加載，在沒有得到圖片前先顯示loading圖片
Vue.use(VueLazyload, {
  //內部自定義了一個指令lazy
  loading, //指定未加載得到圖片之前的loading圖片
});

//element-ui當中有分為兩種組件
//第一種組件就和下面這個Button一樣，可以引入然後全局註冊
// Vue.use(Button);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
//第二種組件就和MessageBox類似，引入之後不能直接註冊，而是掛載Vue原型上
// Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message; //用來做提示消息，比alert要好看

//无论什么样的暴露方式，往外暴露的都是一个对象
//只不过，暴露的对象形成方式不一样

//默认暴露
// export default {a:100}
// 暴露的是一个对象，这个对象里面是以default为属性名，以default后面的东西为值的对象 *****
// {
//   default:{a:100}
// }

// 引入的时候，如果是默认暴露
// 通常我们是这样引入   import a from './xxx.js'  它其实是一个简写方式
// 全写应该是   import {default as a} from './xxx.js'
// 由于默认暴露引入的时候如果全写会很麻烦，因此才出现上面我们的简写

//分别暴露
// export const a = 100
// export const reqXX = () => {}
//最终暴露出文件的时候，会自动的把分别暴露的信息封装为一个对象 ******
// {
//   a:a,
//   reqXX:reqXX
// }

//引入的时候
// import {reqXX} from './xx.js'
// import {a} from './xx.js

//整体暴露
// const a = 100
// const obj = {a:100}

//最终暴露的就是你export 后面的对象  ********
// export {
//   a,
//   obj
// }

// 引入的时候
// import {a} from './xx.js'
// import {obj} from './xx.js'

//无论什么暴露方式，如果你想拿到暴露出文件的整个那个对象，就得这么干
// import * as xxx from './xx.js'

// import '@/api'

//第二种测试接口请求函数方式
// import {reqCategoryList} from '@/api'
// reqCategoryList()

// import "@/api";

// 第二種測試接口請求函數方式
// import { reqCategoryList } from "@/api";
// reqCategoryList();

import TypeNav from "@/components/TypeNav";
import SlideLoop from "@/components/SlideLoop";
import Pagination from "@/components/Pagination";
//全局註冊的組件, 如果一個非路由組件被多個組件使用, 那麼定義在components, 註冊在全局
// Vue.component(TypeNav.name, TypeNav); //寫這樣前提是組件內要命名
Vue.component("TypeNav", TypeNav);
Vue.component("SlideLoop", SlideLoop);
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this; //安裝總線, 代表任意組件內部都可以通過this.$bus訪問到vm實例(總線)
    Vue.prototype.$API = API; //接口請求函數暴露的整個對象掛到原型上
  },
  el: "#app",
  render: (h) => h(App),
  router, //我們所有組件內部都可以使用this.$router和this.$route
  store, //註冊上我們所有組件都可以拿到this.$store
});
