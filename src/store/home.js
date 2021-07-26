import { reqBannerList, reqCategoryList, reqFloorList } from "@/api";

//這個是home模塊的vuex模塊

//vuex當中的4個核心概念
const state = {
  //存數據
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const mutations = {
  //直接修改數據
  RECEIVE_CATEGORY(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECEIVE_BANNER(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVE_FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions
  async getCategoryList({ commit }) {
    //發請求拿數據, 提交給mutations, 存儲到state
    //await和async作用
    //可以通過同步代碼實現異步效果, 可讀性強
    //.then().catch()不是不能用, 而是可讀性不強, 裡面還是有異步代碼(異步回調函數)
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVE_CATEGORY", result.data);
    }
  },
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("RECEIVE_BANNER", result.data);
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("RECEIVE_FLOORLIST", result.data);
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
