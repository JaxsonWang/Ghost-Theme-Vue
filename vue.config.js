'use strict'
const path = require('path')
const settings = require('./build/settings')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const name = 'Ghost Theme Template'

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.hbs',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name
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
  // more pwa options: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    name: settings.title,
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      exclude: [
        'index.html',
        'package.json'
      ]
    }
  }
}
