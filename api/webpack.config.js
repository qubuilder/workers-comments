const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },
};
