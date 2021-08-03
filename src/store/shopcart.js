//這個是shopcart模塊的vuex模塊
import { reqAddOrUpdateShopCart } from "@/api";

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
