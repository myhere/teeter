define(function(require, exports, module) {
  function Velocity(value, theta) {
    this._value = value;
    this._theta = theta;
  }

  Velocity.prototype = {
    constructor: Velocity,

    accelerate: function(acceleration, t) {
      var accelerationonX = acceleration.getOnX();
      var accelerationonY = acceleration.getOnY();

      var velocityOnX = this.getOnX() + accelerationonX * t;
      var velocityOnY = this.getOnY() + accelerationonY * t;

      this._value = Math.sqrt(velocityOnX * velocityOnX + velocityOnY * velocityOnY);
      if (velocityOnX === 0) {
        if (velocityOnY > 0) {
          this._theta = 0.5 * Math.PI;
        } else {
          this._theta = 1.5 * Math.PI;
        }
      } else {
        this._theta = Math.atan(velocityOnY / velocityOnX);
      }
    },

    getOnX: function() {
      return this._value * Math.cos(this._theta);
    },

    getOnY: function() {
      return this._value * Math.sin(this._theta);
    }
  };

  module.exports = Velocity;
});
