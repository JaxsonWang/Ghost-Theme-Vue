'use strict'
const fs = require('fs')
const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

/**
 * 文件操作
 * @param inFile 输入文件
 * @param outFile 输出文件
 */
const modifyFile = (inFile, outFile) => {
  fs.readFile(`./${config.outputDir}/${inFile}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    const result = data.replace(/{{ghost_(head|foot)}}/g, ``)

    fs.writeFile(`./${config.outputDir}/${outFile}`, result, 'utf8', (err) => {
      if (err) {
        throw err
      }
    })
  })
}

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`)

  // 删除 ghost 模板引擎语法
  modifyFile('index.html', 'index.html')
  modifyFile('index.html', 'post.html')

  const port = 9526
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function () {
    console.log(`> Preview at  http://localhost:${port}${publicPath}`)
    if (report) {
      console.log(`> Report at  http://localhost:${port}${publicPath}report.html`)
    }
  })
} else {
  run(`vue-cli-service build ${args}`)
}
