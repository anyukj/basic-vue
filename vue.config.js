const webpack = require('webpack');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '基础平台系统',
    },
  },
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        // 代理地址，地址为/api/开始的会转向target
        // target: 'http://47.92.204.125:8096',
        target: 'http://47.119.113.51:8010/',
        // 如果接口跨域，需要进行这个参数配置
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
