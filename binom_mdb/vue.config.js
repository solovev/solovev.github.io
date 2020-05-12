const path = require('path')

const stylesDir = 'styles'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/binom_mdb_dist/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, 'src', stylesDir),
            path.resolve(__dirname, 'node_modules', 'normalize-scss', 'sass')
          ]
        },
        prependData: `
          @import "@/${stylesDir}/_variables.scss";
          @import "@/${stylesDir}/_mixins.scss";
        `
      }
    }
  }
}
