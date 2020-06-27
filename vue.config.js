module.exports = {
  productionSourceMap: false,

  configureWebpack: (config) => {
    config.resolve.extensions = ['*', '.js', '.vue', '.json', '.scss'];
  },

  /*
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~materialize-css/dist/css/materialize.min.css";'
      },
    },
  },
  */

  chainWebpack: (config) => {
    // Only convert .svg files that are imported by these files as Vue component
    const FILE_RE = /\.(vue|js|ts|svg)$/;

    // Use vue-cli's default rule for svg in non .vue .js .ts files
    config.module.rule('svg').issuer(file => !FILE_RE.test(file));

    // Use our loader to handle svg imported by other files
    config.module
      .rule('svg-component')
      .test(/\.svg$/)
      .issuer(file => FILE_RE.test(file))
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader');
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/vue-tm-materialize/' : '/',

  lintOnSave: false,
};
