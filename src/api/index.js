/*
    這個文件寫的都是函數, 叫接口請求函數
    之後, 我們每個接口都對應了一個函數, 如果想要拿相關接口數據, 只需要調用相關  請求函數

   
    axios使用 1.函數用法 2.對象用法
    三種參數 params參數 query參數 請求體參數
    params參數: 是在url當中攜帶的, 屬於路徑的一部分
    query參數: 可以在url當中攜帶 ? 分割, 後面就是query參數
                 也可以在配置對象當中配置, 配置的屬性名叫params
    請求體參數, 在配置對象當中data裡面配置, 請求方式是put和post才有請求體參數
    
    axios({
        url:'localhost:8080/userInfo/1?name=zhaoliying',
        method:,
        params:{
            代表是query參數
            name:'zhazoliying'
        },
        data:{
            配的是請求體參數
        }
    })
*/
import request from "./ajax";
import mockAjax from "@/api/mockAjax";

// 請求三級列表
// /api/product/getBaseCategoryList
// get
// 無參
export const reqCategoryList = () => {
  return request({
    url: "get/product/getBaseCategoryList",
    methods: "get",
  });
};

// 驗證請求是否成功
// 這裡如果要調用, 得把模塊引入到main當中
// 第一種驗證方式
// reqCategoryList();

//請求獲取模擬接口的數據banner和floor

export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};

export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};

/*
  
請求獲取search頁面的數據
api/v2/post/list
請求體參數, 一個對象
POST

*/
export const reqSearchInfo = (searchParams) => {
  return request({
    url: "post/list",
    method: "post",
    data: searchParams,
  });
};

//searchParams是用戶搜索的參數, 這個參數是用戶再發請求的時候所傳遞的
//這個請求參數, searchParams必須是一個對象, 可以是空對象, 但必須傳, 不能不傳
//其實用戶發請求時, 這個參數給空對象{}, 也可以獲取到數據的, 代表獲取商品默認搜索的數據
//測試
// reqSearchInfo({});

/*
  請求獲取詳情數據
 /api/v2/get/item/
 GET
*/
export const reqDetailInfo = (skuId) => {
  return request({
    url: `get/item/${skuId}`,
    method: "get",
  });
};

// 請求添加購物車(修改購物車的商品數量)
// /api/v2/post/cart/addToCart/{skuId}/{skuNum}
// POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return request({
    url: `post/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
    data: {},
  });
};

// 請求獲取購物車列表
// /api/v2/get/cart/cartList
// GET
export const reqShopCartInfo = () => {
  return request({
    url: "get/cart/cartList",
    method: "get",
  });
};

//請求修改購物車選中狀態
// api/v2/get/cart/checkCart/{skuId}/{isChecked}
// GET
export const reqUpdateCartIsCheck = (skuId, isChecked) => {
  return request({
    url: `get/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

//請求刪除購物車數據
// api/v2/delete/cart/deleteCart/{skuId}
// DELETE
export const reqDeleteShopCart = (skuId) => {
  return request({
    url: `delete/cart/deleteCart/${skuId}`,
    method: "delete",
    data: {},
  });
};

//請求註冊用戶
// post/user/passport/register
// POST
// 參數: 請求體 code phone password
export const reqUserRegister = (userInfo) => {
  return request({
    url: "post/user/passport/register",
    method: "post",
    data: userInfo,
  });
};

//請求獲取用戶註冊驗證碼
// /api/v2/get/user/passport/sendCode/{phone}
//get
export const reqGetCode = (phone) => {
  return request({
    url: `get/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

//請求用戶登入
// /api/v2/post/user/passport/login
// POST
// 返回   這邊返回的東西不嚴謹，按道理來講
// "data": {
//   "nickName": "Administrator",
//   "name": "Admin",
//   "userId": 2,
//   "token": "cb8f29208f6648bc8226da2379d5fe6e"
// },
export const reqUserLogin = (userInfo) => {
  return request({
    url: "post/user/passport/login",
    method: "post",
    data: userInfo,
  });
};

//根據token請求獲取用戶的訊息
// /api/v2/get/user/passport/auth/getUserInfo
//參數token已經在請求頭中添加了
// GET
export const reqGetUserInfo = () => {
  return request({
    url: "get/user/passport/auth/getUserInfo",
    method: "get",
  });
};

//請求退出登入
// /api/v2/get/user/passport/logout
// GET
export const reqUserLogout = () => {
  return request({
    url: "get/user/passport/logout",
    method: "get",
  });
};

//請求用戶收貨地址訊息
// /api/v2/get/user/userAddress/auth/findUserAddressList
//get
export const reqUserAddressList = () => {
  return request({
    url: "get/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

//請求獲取訂單交易頁面
// /api/v2/get/order/auth/trade
// get
export const reqTradeInfo = () => {
  return request({
    url: "get/order/auth/trade",
    method: "get",
  });
};

//請求提交訂單，創建訂單
///api/v2/post/order/auth/submitOrder?tradeNo={tradeNo}
// post
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return request({
    url: `post/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeInfo,
  });
};

//請求獲取支付訊息
//api/v2/get/payment/weixin/createNative/${orderId}
//get
export const reqPayInfo = (orderId) => {
  return request({
    url: `get/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

//請求獲取訂單支付狀態
// api/v2/get/payment/weixin/queryPayStatus/${orderId}
// get
export const reqPayStatus = (orderId) => {
  return request({
    url: `get/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

// 最終暴露的是
// {
//   reqAddOrUpdateShopCart,
//   reqBannerList
//   ...
// }

//import * as API from '@/api'
