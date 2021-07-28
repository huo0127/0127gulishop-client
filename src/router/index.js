// 2.引入並聲明使用插件
import vue from "vue";
import VueRouter from "vue-router";

vue.use(VueRouter);

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

/* 
    VueRouter 是路由器對象的構造函數
    this.$router 調用的是路由器對象的方法, 這個方法並不是路由器實例化的
    對象的方法, 而是這個對象原型的方法
    這個實例化對象的方法, 就是VueRouter的顯示原型的方法
    this.$router是實例化對象, 是VueRouter的實例化對象
*/

//將原有push方法地址保存起來, 後期還能拿到原來的
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

//可以去修改原型的push, 讓原型的push指向另外一個函數
VueRouter.prototype.push = function(location, onResolve, onRejected) {
  /*
  location就是我們調用this.$router.push所傳遞過來的對象
  {
    name: "search",
    params: { keyword: "" || undefined },
    query: { keyword1: this.keyword.toUpperCase()
  }
*/

  if (onResolve === undefined && onRejected === undefined) {
    //證明調用的時候只傳遞了匹配路由對象, 沒有傳遞成功或者失敗的回調 this為實例化對象
    return originPush.call(this, location).catch(() => {});
  } else {
    //證明調用的時候傳遞了成功或者失敗的回調, 或者都有
    return originPush.call(this, location, onResolve, onRejected);
  }
};

VueRouter.prototype.replace = function(location, onResolve, onRejected) {
  //location就是我們調用this.$router.push所傳遞過來的對象
  // {
  //   name: "search",
  //   params: { keyword: "" || undefined },
  //   query: { keyword1: this.keyword.toUpperCase()
  // }
  if (onResolve === undefined && onRejected === undefined) {
    //證明調用的時候只傳遞了匹配路由對象, 沒有傳遞成功或者失敗的回調
    return originReplace.call(this, location).catch(() => {});
  } else {
    //證明調用的時候傳遞了成功或者失敗的回調, 或者都有
    return originReplace.call(this, location, onResolve, onRejected);
  }
};

// 3.向外暴露一個路由器對象
export default new VueRouter({
  //配置路由
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/search/:keyword?", // 加 ? 代表我的params可傳可不傳
      component: Search,
      name: "search", //命名路由

      //理解過程
      // params:{
      //   keyword:'abc'
      // }
      // query:{
      //   keyword1:'ABC'
      // }
      // props: //這個props是我們在路由組件中, 操作params參數和query參數的簡化方法
      // props: true, //會默認的把傳遞過來的params參數, 額外的映射為組件當中的屬性去操作
      // props: {
      //   username: "zhaoliying", //傳第一個對象, 傳遞的是額外你需要的靜態數據, 不需要就不用
      // },
      props: (route) => {
        return {
          keyword: route.params.keyword,
          keyword1: route.query.keyword1,
        };
      },
    },
    {
      path: "/login",
      component: Login,
      //路由對象中的原配置項, 可以配置我們所需要的任何數據
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/register",
      component: Register,
      //路由對象中的原配置項, 可以配置我們所需要的任何數據
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
