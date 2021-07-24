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
