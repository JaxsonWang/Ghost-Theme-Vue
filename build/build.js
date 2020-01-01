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

/**
 * 复制文件
 * @param src 源文件
 * @param dist 复制文件
 */
const copyFile = (src, dist) => {
  // 复制文件
  fs.createReadStream(src).pipe(fs.createWriteStream(dist))
  // 读取文件 - index/post
  modifyFile('index.hbs', 'index.hbs', ghost.index)
  modifyFile('post.hbs', 'post.hbs', ghost.post)
}

copyFile(
  `./${settings.outputDir}/index.hbs`,
  `./${settings.outputDir}/post.hbs`
)
