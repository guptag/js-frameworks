const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    extractSass
  ],

  // when importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // this is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {

  }
};