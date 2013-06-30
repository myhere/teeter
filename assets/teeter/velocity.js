define(function(require, exports, module) {
  function Velocity(value, theta) {
    this._value = value;
    this._theta = theta;
  }

  Velocity.prototype = {
    constructor: Velocity,

    getVelocityOnX: function() {
    },

    getVelocityOnY: function() {
    }
  };

  module.exports = Velocity;
});
