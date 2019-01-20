const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports =
  withCss(
    withSass(
      withTypescript(
        {
          webpack(config, options) {
            return config;
          },
          generateBuildId: async () => {
            return 'v1';
          },
          distDir: '../.next'
        }
      )
    )
  );
