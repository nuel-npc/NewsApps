const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = merge(common, {
//   mode: 'development',
// });

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    hot: false,
    liveReload: true,
    open: true,
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        ignored: ['**/sw.js'],  // Ignore service worker file
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/scripts/sw.js'),
          to: path.resolve(__dirname, 'dist/sw.bundle.js'),
          transform(content) {
            return content.toString().replace('self.__WB_MANIFEST', '[]');
          },
        },
      ],
    }),
  ],
});