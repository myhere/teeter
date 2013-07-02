define(function(require, exports, module) {
  var $ = require('zepto');

  var debug = location.search.indexOf('debug') !== -1;

  // if (debug) {
  //   var consoleNode = $('<div></div>');
  //   consoleNode
  //     .css({
  //       position: 'fixed',
  //       bottom:'0',
  //       height:'100px',
  //       width:'100%',
  //       background:'#ccc'
  //     })
  //     .appendTo('#container');
  // }


  module.exports = {
    isDebug: function() {
      return debug;
    },
    log: function(msg) {
      if (debug) {
        // consoleNode.html(msg);
        console.log(msg);
      }
    },
    clear: function() {
      if (debug) {
        // consoleNode.html('');
      }
    }
  };
});
