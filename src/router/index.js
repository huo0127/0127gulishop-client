// 2.引入並聲明使用插件
import vue from "vue";
import VueRouter from "vue-router";

vue.use(VueRouter);

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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