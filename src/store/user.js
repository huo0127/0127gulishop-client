//這個是user模塊的vuex模塊

import { getUserTempId } from "@/utils/userabout";

//vuex當中的4個核心概念
const state = {
  //存數據
  //getUserTempId() 是用來專門生成用戶的臨時標識的
  userTempId: getUserTempId(),
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

export default {
  state,
  mutations,
  actions,
  getters,
};
