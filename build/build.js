'use strict'
const fs = require('fs')
const settings = require('../vue.config')
const ghost = require('../ghost/hbs-template')

/**
 * 文件操作
 * @param inFile 输入文件
 * @param outFile 输出文件
 * @param modify 修改内容
 */
const modifyFile = (inFile, outFile, modify) => {
  fs.readFile(`./${settings.outputDir}/${inFile}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    const result = data.replace(/<noscript><\/noscript>/g, `<noscript>${modify}</noscript>`)

    fs.writeFile(`./${settings.outputDir}/${outFile}`, result, 'utf8', (err) => {
      if (err) {
        throw err
      }
    })
  })
}

modifyFile('index.html', 'index.hbs', ghost.index)
modifyFile('index.html', 'post.hbs', ghost.post)

// 删除文件
fs.unlinkSync(`./${settings.outputDir}/index.html`)
