seajs.config({
  plugins: ['shim'],
  alias: {
    'zepto': {
      src: 'lib/zepto.js',
      exports: 'Zepto'
    },

    'underscore': {
      src: 'lib/underscore-min.js',
      exports: '_'
    },

    'history': {
      src: 'lib/zepto.history.js',
      exports: 'History'
    },

    'iScroll': {
      src: 'lib/iscroll.js',
      exports: 'iScroll'
    }
  }
});

