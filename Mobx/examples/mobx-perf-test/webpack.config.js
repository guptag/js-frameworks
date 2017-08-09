const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "index.css"
});

module.exports = {
  entry: ['./src/index.tsx', './src/index.scss'],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  // enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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