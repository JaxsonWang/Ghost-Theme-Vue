'use strict'
const path = require('path')
const themeConfig = require('./src/theme.config')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = themeConfig.title
    config.resolve.alias['@'] = resolve('src')
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置.
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].header = '{{ghost_head}}'
        args[0].footer = '{{ghost_foot}}'
        // more options: https://github.com/jantimon/html-webpack-plugin#minification
        return args
      })
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  // more pwa options: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    name: themeConfig.title,
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'assets/img/icons/favicon-32x32.png',
      favicon16: 'assets/img/icons/favicon-16x16.png',
      appleTouchIcon: 'assets/img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'assets/img/icons/safari-pinned-tab.svg',
      msTileImage: 'assets/img/icons/msapplication-icon-144x144.png'
    },
    manifestPath: 'assets/manifest.json',
    workboxOptions: {
      exclude: [
        /\.hbs$/,
        'index.html',
        'package.json'
      ]
    }
  }
}
