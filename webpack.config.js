var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./public/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
    })
  ]
}
