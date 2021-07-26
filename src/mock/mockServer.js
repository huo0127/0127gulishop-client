//這個文件專門來模擬mock數據街口的
import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";

//這兩行就是在模擬數據接口
//第一個參數, 代表我們以後請求的路徑, 第二個參數代表返回的數據
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
