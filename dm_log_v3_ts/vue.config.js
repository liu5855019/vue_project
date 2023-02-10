const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: "localhost",
    port:5000,
    proxy: { // 配置跨域
      '/api': {
        target:'http://192.168.52.21:8001',
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
