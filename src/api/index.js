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
