const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "index.css"
});

module.exports = {
  entry: ['./src/index.ts', './src/index.scss'],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  // enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.ts', '.html', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: false,
            minimize: false
          }
        }
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "sass-loader"
              }]
          })
      }
    ]
  },

  plugins: [
    extractSass,
    new CopyWebpackPlugin([
        { from: 'external/stats.js', to: '.' /* output */},
        { from: 'external/stocks.json', to: '.' },
        { from: 'external/font-awesome/font-awesome.css', to: './styles' },
        { from: 'external/font-awesome/fonts', to: './styles/fonts' },
        { from: 'external/favicon.ico', to: '.' },
        { from: 'index.html', to: '.' }
    ])
  ],

  externals: {

  }
};