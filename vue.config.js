const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':""}
      }
    },
    host: '127.0.0.1',
    // https:true,
      port: 6103,
      client: {
        webSocketURL: 'ws://0.0.0.0:6103/ws',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
  },
  
  transpileDependencies: true,
})
