//這個文件是和用戶相關的一些工具函數
//專門用來生成用戶臨時標示
//一般用戶的臨時標示是唯一的，而且一旦生成不會輕易改變

import { v4 as uuidv4 } from "uuid";
export function getUserTempId() {
  //先從localStorage當中去獲取用戶的臨時標示
  //localStorage獲取不會數據返回的是null
  let userTempId = localStorage.getItem("USERTEMPID_KEY");
  //如果獲取到了，直接返回使用
  if (!userTempId) {
    //如果沒有獲取到，在通過uuid重新創建，而且存儲到localStorage
    userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    localStorage.setItem("USERTEMPID_KEY", userTempId);
  }
  return userTempId;
}
