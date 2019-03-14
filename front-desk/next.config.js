const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {
  };
}

module.exports = withTypescript(
  withSass(
    withCss({
      webpack(config, options) {
        config.plugins.push(
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
          })
        );
        return config;
      },
      generateBuildId: async () => {
        return 'v1.0.0';
      },
      distDir: '../.next'
    })
  )
);
