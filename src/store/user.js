//這個是user模塊的vuex模塊

import { getUserTempId } from "@/utils/userabout";
import {
  reqUserRegister,
  reqGetCode,
  reqUserLogin,
  reqGetUserInfo,
  reqUserLogout,
} from "@/api";

//vuex當中的4個核心概念
const state = {
  //存數據
  //getUserTempId() 是用來專門生成用戶的臨時標識的
  userTempId: getUserTempId(),
  code: "", //用戶註冊驗證碼訊息

  // token: "",
  // 初始化空串不對，無法做到自動登入
  //自動登入先從localStorage拿取，能拿到就不需要再發登入請求了
  token: localStorage.getItem("TOKEN_KEY"),

  userInfo: {}, //根據token獲取用戶訊息
};

const mutations = {
  //直接修改數據
  RECEIVE_CODE(state, code) {
    state.code = code;
  },

  RECEIVE_TOKEN(state, token) {
    state.token = token;
  },

  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },

  //token過期需要重新清空
  // RESET_TOKEN(state) {
  //   state.token = "";
  // },

  //退出登入需要清空用戶訊息及token，它可以和上面token過期並用一個
  RESET_USER(state) {
    state.token = "";
    state.userInfo = {};
  },
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions
  async userRegister({ commit }, userInfo) {
    const result = await reqUserRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //請求獲取code
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("RECEIVE_CODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //請求登入
  async getUserLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo);
    if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      //token獲取到以後，需要儲存到localStorage當中，因為token在一定時間內
      //是不能隨意更改的
      localStorage.setItem("TOKEN_KEY", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //根據token請求獲取用戶訊息
  async getUserInfo({ commit }) {
    const result = await reqGetUserInfo();
    if (result.code === 200) {
      commit("RECEIVE_USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //清除用戶的token訊息
  async clearToken({ commit }) {
    commit("RESET_USER");
    //當token過期，需要把過去的token清除，不但要清除state的也要清除localStorage的。
    localStorage.removeItem("TOKEN_KEY");
  },

  //退出登入
  async userLogout({ commit }) {
    const result = await reqUserLogout();
    if (result.code === 200) {
      //退出成功
      commit("RESET_USER");
      //清空數據 清空state的token state的用戶訊息 localStorage的token
      localStorage.removeItem("TOKEN_KEY");

      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
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
