//這個是shopcart模塊的vuex模塊
import {
  reqAddOrUpdateShopCart,
  reqShopCartInfo,
  reqUpdateCartIsCheck,
} from "@/api";

//vuex當中的4個核心概念
const state = {
  //存數據
  shopCartInfo: [],
};

const mutations = {
  //直接修改數據
  RECEIVE_SHOPCARTINFO(state, shopCartInfo) {
    state.shopCartInfo = shopCartInfo;
  },
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions

  /*
  async函數稱作異步函數，一般內部都是有異步操作的
  async函數返回值，一定是promise對象，不看return
  返回的promise對象的成功和失敗及結果，要看return

  return的結果如果是非promise對象，那麼promise一定是成功的，成功的結果就是return的結果
  return的結果如果是promise對象，那麼要看這個return後面的promise對象是成功的還是失敗的
      如果return的promise對象是成功的，那麼promise對象就是成功的，成功的結果就是return的
      promise的成功的結果。
      如果return的promise對象是失敗的，那麼promise對象就是失敗的，失敗的結果就是return的
      promise的失敗的結果。

  如果沒有return結果而是拋出錯誤，promise也是失敗的，原因就是拋出的錯誤原因
*/
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // 這個寫法async函數返回的promise永遠成功，不合常理
    // 但對於我們寫代碼可行
    // if (result.code === 200) {
    //   return "ok";
    // } else {
    //   return "failed";
    // }
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  async getShopCartInfo({ commit }) {
    const result = await reqShopCartInfo();
    if (result.code === 200) {
      commit("RECEIVE_SHOPCARTINFO", result.data);
    }
  },

  //修改購物車選中
  async updateCartIsCheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCartIsCheck(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //async await 相關
  //promise基礎用法
  //then和catch 鏈式調用(中斷)
  //Promise.reject()
  //Promise.resolve()
  //Promise.race()
  //Promise.all()

  //使用Promise.all，採用單個修改的接口去修改多個，但是真正不是這樣做的
  //真正應該有一個修改多個的接口
  //Promise.all()，是promise的一個api
  //功能: 批量處理多個promise對象
  //參數: promise對象的數組
  //返回值: 返回一個新的promise對象

  //新的promise對象是成功還是失敗
  //只有所有的promise都成功才是成功，只要有一個失敗直接就是失敗
  //新的promise對象成功的結果: 是參數promise對象數組當中每個promise對象成功的結果組成的數組
  //新的promise對象失敗的結果: 是參數promise對象數組當中每個失敗的promise對象失敗的原因組成的數組

  updateCartIsCheckAll({ commit, getters, dispatch }, isChecked) {
    let promises = [];
    // getters.cartInfo.cartInfoList 獲取到的就是我們的購物車列表數據
    getters.cartInfo.cartInfoList.forEach((item) => {
      //如果發現其中的每個購物車數據已經和要改變的狀態一樣，那就不用請求數據了
      if (item.isChecked === isChecked) return;
      let promise = dispatch("updateCartIsCheck", {
        skuId: item.skuId,
        isChecked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};

const getters = {
  //後面用來簡化數據的操作
  cartInfo(state) {
    //這個數據拿到的是我們的購物車列表
    return state.shopCartInfo[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
