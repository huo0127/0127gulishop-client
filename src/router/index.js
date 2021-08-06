// 2.引入並聲明使用插件
import vue from "vue";
import VueRouter from "vue-router";

vue.use(VueRouter);

import routes from "./routes";
import store from "@/store";

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
const router = new VueRouter({
  //配置路由
  routes,
  //配置滾動行為，跳轉到新的路由介面滾動條位置。
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

//註冊全局前置導航守衛，用來對token校驗(根據token獲取用戶訊息)
router.beforeEach(async (to, from, next) => {
  /*
    to 跳轉的目的地路由對象
    from 從哪來的路對象
    next是一個函數
    根據參數不同，功能不同
    next() 代表無條件放行
    next('/')代表強制跳轉到指定的位置
    next(false)代表甚麼都不做，原地不動
  */

  //第一步：守衛攔截住，先去獲取用戶的token和用戶的訊息
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo.name;

  if (token) {
    //如果token是存在的，代表用戶登入過
    if (to.path === "/login") {
      //用戶已經登入過了，還要往登入頁面跳轉，沒必要，讓他回首頁
      next("/");
    } else {
      //如果用戶已經登入了，但是跳轉的不再是登入頁，那麼我們得看用戶的訊息獲取了沒
      if (userInfo) {
        //如果用戶的訊息已經獲取，無條件放行
        next();
      } else {
        //用戶已經登入，但是用戶還沒有獲取用戶訊息，在這裡就需要請求獲取用戶訊息
        try {
          //如果獲取用戶訊息成功，用戶訊息拿到就無條件放行
          await store.dispatch("getUserInfo"); //用戶根據token獲取用戶訊息
          next();
        } catch (error) {
          //根據token獲取用戶訊息失敗，代表token可能過期
          //把用戶過期的token清理掉，重新跳轉到登入頁
          store.dispatch("clearToken");
          next("/login");
        }
      }
    }
  } else {
    //用戶根本沒登入，目前我們甚麼都不做，直接放行，後面我們是需要添加功能的。
    //如果用戶訪問的是  交易相關  支付相關  個人中心相關，那麼跳轉到登入頁面
    let targetPath = to.path;
    if (
      targetPath.indexOf("/trade") !== -1 ||
      targetPath.indexOf("pay") !== -1 ||
      targetPath.startsWith("/center")
    ) {
      // next("/login"); 這樣寫可以直接去到登入頁，但是登入成功不會去之前想去的地方

      //想要回到之前想去的地方，必須把想去的那個路徑帶到登入裡面
      next("login?redirect=" + targetPath);
    } else {
      next();
    }
  }
});

export default router;
