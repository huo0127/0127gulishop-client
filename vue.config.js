module.exports = {
  lintOnSave: false, //禁用eslint
  devServer: {
    proxy: {
      api: {
        //轉發的目標服務器地址
        target: 'http://39.98.123.211',
        //是否把路徑當中的/api去掉
        //要不要去掉/api, 要看接口路徑裡面有沒有, 如果有,那就不去
        // pathRewrite: { "^/api": "" },
      },
    },
  },
}
