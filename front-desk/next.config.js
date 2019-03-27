const fs = require('fs');
const path = require('path');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {
  };
}

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {
  };
}

// change: antd theme
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/static/less/antd-custom.less'), 'utf8')
);

module.exports = withTypescript(
  withLess(
    withSass(
      withCss({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables // make your antd custom effective
        },
        webpack(config, options) {
          config.plugins.push(
            // 隐藏样式冲突警告
            new FilterWarningsPlugin({
              exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
            })
          );
          return config;
        },
        generateBuildId: async () => {
          return 'v1.2.2.2.2.2.2.2';
        },
        distDir: '../.next'
      })
    )
  )
);
