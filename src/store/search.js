//這個是search模塊的vuex模塊
import { reqSearchInfo } from "@/api";
//vuex當中的4個核心概念
const state = {
  //存數據
  searchInfo: {},
};

const mutations = {
  //直接修改數據
  RECEIVE_SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo;
  },
};

const actions = {
  //與組件當中用戶對接
  //一般是異步請求
  //提交mutaions
  async getSearchInfo({ commit }, searchParams) {
    //searchParams這個參數, 是用戶發請求的時候, 也就是dispatch的時候給我們傳遞的對象
    //這個參數在actions的函數當中只能放在{commit}後面
    const result = await reqSearchInfo(searchParams);
    if (result.code === 200) {
      commit("RECEIVE_SEARCHINFO", result.data);
    }
  },
};

const getters = {
  //後面用來簡化數據的操作
  //為什麼要getters, 是因為我們或取道的數據內部結構比較複雜, 使用起來不方便, 甚至會出現小問題(假報錯), 所以我們拿到複雜的數據之後, 會把這個數據先做計算, 計算出來我們要直接使用的數據, 簡化數據操作
  attrsList(state) {
    return state.searchInfo.attrsList || []; //是為了後期不出現假報錯, 所以給[]
  },
  goodsList(state) {
    return state.searchInfo.goodsList || [];
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
