const path = require('path');

module.exports = function(webpackEnv) {

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@components': path.resolve(__dirname, './src/components/'),
      },
    },
  };
};