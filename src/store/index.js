import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import user from "./user";
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import trade from "./trade";

//vuex當中的4個核心概念
const state = {
  //存數據
};

const mutations = {
  //直接修改數據
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions
};

const getters = {
  //後面用來簡化數據的操作
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // modules代表模塊化
  modules: {
    home,
    user,
    search,
    detail,
    shopcart,
    trade,
  },
});

//最終暴露
// {
//   default:store
// }
