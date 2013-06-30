define(function(require, exports, module) {
  var $ = require('zepto');

  var debug = location.search.indexOf('debug') !== -1;

  if (debug) {
    var consoleNode = $('<div></div>');
    consoleNode
      .css({
        position: 'fixed',
        bottom:'0',
        height:'100px',
        width:'100%',
        background:'#ccc'
      })
      .appendTo('#container');
  }


  module.exports = {
    log: function(msg) {
      if (debug) {
        consoleNode.html(msg);
      }
    },
    clear: function() {
      if (debug) {
        consoleNode.html('');
      }
    }
  };
});
