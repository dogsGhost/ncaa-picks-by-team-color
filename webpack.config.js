var HtmlWepackPlugin = require('html-webpack-plugin');
var HTMLWepackPluginConfig = new HtmlWepackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],

  devtool: 'source-map',

  module: {
    loaders: [
      // sass
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      // javascript
      {
        test: /\.js$/,
        include: __dirname + '/app',
        loader: 'babel-loader'
      }
    ]
  },

  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },

  plugins: [
    HTMLWepackPluginConfig
  ]
}
