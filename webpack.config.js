const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new ESLintWebpackPlugin({ extensions: 'ts' })],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
