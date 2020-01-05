'use strict'
const fs = require('fs')
const vueConfig = require('../vue.config')
const themeConfig = require('../src/theme.config')
const ghost = require('../ghost/hbs-template')

/**
 * 文件操作
 * @param inFile 输入文件
 * @param outFile 输出文件
 * @param modify 修改内容
 */
const modifyFile = (inFile, outFile, modify) => {
  fs.readFile(`./${vueConfig.outputDir}/${inFile}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    const result = data.replace(/<noscript><\/noscript>/g, `<noscript>${modify}</noscript>`)

    fs.writeFile(`./${vueConfig.outputDir}/${outFile}`, result, 'utf8', (err) => {
      if (err) {
        throw err
      }
    })
  })
}

/**
 * package.json 修改
 * @param file
 */
const modifyPackage = (file) => {
  fs.readFile(`./${vueConfig.outputDir}/${file}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    const result = JSON.parse(data)
    result.name = themeConfig.title
    result.description = themeConfig.description
    result.version = themeConfig.version
    result.config = themeConfig.config
    fs.writeFile(`./${vueConfig.outputDir}/${file}`, JSON.stringify(result), 'utf8', (err) => {
      if (err) {
        throw err
      }
    })
  })
}

modifyFile('index.html', 'index.hbs', ghost.index)
modifyFile('index.html', 'post.hbs', ghost.post)

// 删除文件
fs.unlinkSync(`./${vueConfig.outputDir}/index.html`)

modifyPackage('package.json')
