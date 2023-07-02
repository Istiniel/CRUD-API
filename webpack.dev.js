const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
})
