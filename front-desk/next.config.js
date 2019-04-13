const fs = require('fs');
const path = require('path');
const withCss = require('@zeit/next-css');
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
    withCss({
      // extends webpack config
      webpack(config, options) {
        config.plugins.push(
          // hidden style conflict warning
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
          })
        );
        // production environment compress css
        if (config.mode === 'production' && Array.isArray(config.optimization.minimizer)) {
          const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
          config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }
        return config;
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
      },
      generateBuildId: async () => {
        return 'v1.0.0.0.5';
      },
      distDir: '../.next'
    })
  )
);
