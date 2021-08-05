import { reqTradeInfo } from "@/api";

//vuex當中的4個核心概念
const state = {
  //存數據
  tradeInfo: {},
};

const mutations = {
  //直接修改數據
  RECEIVE_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};

const actions = {
  async getTradeInfo({ commit }) {
    const result = await reqTradeInfo();
    if (result.code === 200) {
      commit("RECEIVE_TRADEINFO", result.data);
    }
  },
};

const getters = {
  //後面用來簡化數據的操作
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
