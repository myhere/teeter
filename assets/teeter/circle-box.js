define(function(require, exports, module) {
  var $ = require('zepto');

  function CircleBox() {
    this._node = $('#circle-box');

    this._circles = [];
  }

  CircleBox.prototype = {
    constructor: CircleBox,

    getNode: function() {
      return this._node;
    },

    add: function(circle) {
      this._circles.push(circle);
      this._node.append(circle.getNode());

      circle.setBox(this);
    }
  };

  module.exports = CircleBox;
});
