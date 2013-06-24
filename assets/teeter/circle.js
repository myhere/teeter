define(function(require, exports, module) {
  var $ = require('zepto');

  function Circle(item) {
    var tmpl = '<div class="circle">' + item.text + '</div>';

    this._item = item;
    this._node = $(tmpl);
  }

  Circle.prototype = {
    constructor: Circle,

    getNode: function() {
      return this._node;
    },

    setBox: function(circleBox) {
      this._circleBox = circleBox;
    },
  };

  module.exports = Circle;
});
