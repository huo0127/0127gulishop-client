/*
    這個文件是對axios進行二次封裝
    額外的讓axios發請求的時候, 具有其他的功能
      功能:
        1. 配置基础路径和超时限制
        2. 添加进度条信息  nprogress
        3. 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
        4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from "axios";
//引入mprogress相關的js和css
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

//以後只要是對axios二次封裝, 不會在axios身上去封裝, 而是創建一個新的axios實例去進行封裝
//axios.create() 創建一個新的和axios具有相同功能的一個實例
const service = axios.create({
  // 1. 配置基礎路徑和超時限制
  baseURL: "/api/v2", //設置, 當前項目當中所有接口路徑的公共路徑部分, 基礎路徑
  timeout: 20000, //當ajax請求超時設置的這個事件就會報錯
});

// 2. 添加进度条信息  nprogress
// 以後如果你想對axios添加額外的功能或者是給請求頭添加額外的訊息
// 一定會用到axios的請求攔截器與響應攔截器

// 請求攔截器, 每個ajax請求都要經過這個攔截器去攔截
service.interceptors.request.use(
  //請求攔截器成功的回調
  (config) => {
    //config其實就是我們的報文
    //這個請求報文, 最後一定要返回去, 因為還要繼續往下走
    //在這裡我們可以添加額外的功能, 也可以給請求頭添加需要的屬性
    NProgress.start(); //開啟進度條

    //請求頭內部需要添加臨時標識，後期每個請求都會戴上這個臨時標識
    let userTempId = store.state.user.userTempId;
    if (userTempId) {
      config.headers.userTempId = userTempId;
    }

    //登入成功後，需要把token添加道請求頭中，從今以後所有的請求當中都要帶token
    let token = store.state.user.token;
    if (token) {
      config.headers.token = token;
    }

    return config;
  }
  //請求攔截器當中失敗的回調一般不寫, 因為失敗了, 也就沒有然後了
  // ()=>{
  // }
);

// 響應攔截器
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
service.interceptors.response.use(
  (response) => {
    //response其實就是我們的響應報文
    //我們也可以添加額外功能或者對響應報文進行處理
    NProgress.done(); //停止進度條
    return response.data; //返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
  },
  (error) => {
    NProgress.done(); //停止進度條
    //可以統一處理錯誤
    alert("發送ajax請求失敗" + error.message || "未知錯誤");

    // 統一處理完成之後, 這個錯誤可以讓後面繼續處理, 也可以不讓後面繼續處理

    // 後面想繼續處理這個錯誤, 返回失敗的promise
    // return Promise.reject(new Error("發送ajax請求失敗"));

    // 也可以不讓後面繼續處理這個錯誤, 中斷promise鏈
    // 返回的是pending狀態的promise, 代表中斷promise鏈, 後期就沒辦法處理了
    return new Promise(() => {});
  }
);
export default service; //把封裝好的axios實例, 暴露出去, 後面去用
