const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: "localhost",
    proxy: { // 配置跨域
      '/api': {
        target:'http://len.zaiyuan.cc:8001',
        changOrigin: true,
        pathRewrite: {
          '/api':''
        }
      }
    }
  },

  configureWebpack: {
    devtool: 'source-map'
  }
})
