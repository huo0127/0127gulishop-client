//這個是detail模塊的vuex模塊

import { reqDetailInfo } from "@/api";

const state = {
  //存數據
  detailInfo: {},

  /*
    state是vuex存儲數據的地方，但這個state並不是永久存儲。當我們刷新頁面
    或者重新啟動項目(可以認為刷新頁面就是重起了一下項目)，那麼vuex當中所有的數據，都要重新初始化，重新發請求去獲取。state裡面的數據一開始就是有的，只不過是我們初始化的，不是請求回來了。不過state這個初始化的數據，也會影響組件(組件也是可以獲取這個初始化數據)。

    就是因為vue和vuex沒辦法永久存儲數據，才有以下兩個存儲的方案

    localStorage
    sessionStorage
  */
};

const mutations = {
  //直接修改數據
  RECEIVE_DETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId);
    if (result.code === 200) {
      commit("RECEIVE_DETAILINFO", result.data);
    }
  },
};

const getters = {
  //後面用來簡化數據的操作
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  skuInfo(state) {
    /*
      當請求的數據回來skuInfo才會是真正的對象，
      當請求的數據沒回來skuInfo就是undefined，
      這裡或一個{}，目的就是為了不給組件傳遞undefined，否則使用skuInfo.xxx就會報錯。
      因此我們這裡或一個{}，即使數據沒獲取回來，但是我們給組件的不是undefined，就保證不會出錯。
    */
    return state.detailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
