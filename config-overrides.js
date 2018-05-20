const path = require('path')
const webpack = require('webpack')
const rootDir = path.resolve(__dirname) + '/'
const srcDir = rootDir + 'src/'
const isProd = process.env.NODE_ENV === 'production'
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = {
  webpack: function(config, env) {
    config.module.rules.shift() //去除eslint,配置React全局会校验不过
    config.module.rules[0].oneOf[3].exclude.push(/\.svg$/)
    config = injectBabelPlugin(
      ['import', { libraryName: 'antd', style: true }],
      config
    )
    if (isProd) {
      config.plugins.splice(config.plugins.length - 2, 1) //去掉ServiceWorker
    }
    config = rewireLess.withLoaderOptions({
      modifyVars: { '@primary-color': '#639' }
    })(config, env)
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            name: '[name]',
            prefixize: true,
            regExp: srcDir + 'assets/fonts/svg/(.*)\\.svg'
          }
        }
      ]
    })
    config.resolve.alias = {
      '@module': rootDir + 'node_modules',
      '@': srcDir,
      '@assets': srcDir + 'assets',
      '@images': srcDir + 'assets/images',
      '@fonts': srcDir + 'assets/fonts',
      '@view': srcDir + 'view',
      '@store': srcDir + 'store',
      '@component': srcDir + 'component',
      '@script': srcDir + 'script'
    }
    config.resolve.extensions.push('.scss', '.less', '.css')
    config.plugins.push(new webpack.ProvidePlugin({ React: 'react' }))
    return config
  }
}
