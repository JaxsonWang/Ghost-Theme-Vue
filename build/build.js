const fs = require('fs')
const settings = require('../vue.config')

const copyFile = (src, dist) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}

copyFile(
  `./${settings.outputDir}/index.hbs`,
  `./${settings.outputDir}/post.hbs`
)
