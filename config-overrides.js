const fs = require('fs')
const path = require('path')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#639'
      }
    }),
    addWebpackAlias({
      '@': resolveApp('src'),
      '@module': resolveApp('node_modules'),
      '@assets': resolveApp('src/assets'),
      '@images': resolveApp('src/assets/images'),
      '@fonts': resolveApp('src/assets/fonts'),
      '@view': resolveApp('src/view'),
      '@store': resolveApp('src/store'),
      '@component': resolveApp('src/component'),
      '@script': resolveApp('src/script')
    }),
    config => {
      //自定义svg loader方式
      const len = config.module.rules[2].oneOf.length
      config.module.rules[2].oneOf[1].options.plugins.shift()
      config.module.rules[2].oneOf[len - 1].exclude.push(/\.svg$/)
      config.module.rules[2].oneOf.push({
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              name: '[name]',
              prefixize: true,
              regExp: resolveApp('src/assets/fonts/svg/(.*)\\.svg')
            }
          }
        ]
      })
      return config
    }
  )
}
