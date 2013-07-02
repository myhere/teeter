define(function(require, exports, module) {
  var logger = require('teeter/logger');

  function Velocity(value, theta) {
    this._value = value;
    this._theta = theta;

    // 速度最大值
    this._MAX_VALUE = 50;
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
        // 有一个为负数
        if (this._theta < 0) {
          if (velocityOnX < 0) {
            this._theta += Math.PI;
          } else {
            this._theta += 2 * Math.PI;
          }
        }
        // 同号
        else {
          if (velocityOnX < 0) {
            this._theta += Math.PI;
          }
        }
      }

      // 设置
      if (this._value > this._MAX_VALUE) {
        this._value = this._MAX_VALUE;
      }

      // logger.log('velocity: value: ' + this._value + ' : theta: ' + this._theta / Math.PI * 180);
    },

    /**
     * @param {String}  碰撞的位置, 有四个值: 'left', 'right', 'top', 'bottom'
     */
    collide: function(side) {
      if (side) {
        if (side == 'left') {
          if (this._isThetaInRange(1 * Math.PI, 1.5 * Math.PI)) {
            this._theta = 1.5 * Math.PI + (1.5 * Math.PI - this._theta);
          } else {
            this._theta = 0.5 * Math.PI - (this._theta - 0.5 * Math.PI);
          }
        }
        if (side == 'top' || side == 'bottom') {
          this._theta = 2 * Math.PI - this._theta;
        }
        if (side == 'right') {
          if (this._isThetaInRange(0, 0.5 * Math.PI)) {
            this._theta = 1 * Math.PI - this._theta;
          } else {
            this._theta = 1.5 * Math.PI - (this._theta - 1.5 * Math.PI);
          }
        }

        // 之前一次是碰撞
        if (this._justCollideed) {
          this._value = 0;
        }
        // 速度减半
        else {
          this._value = this._value / 3;
        }

        this._justCollideed = true;
      } else {
        this._justCollideed = false;
      }
    },

    _isThetaInRange: function(min, max) {
      if (max < min) {
        var tmp = max;
        max = min;
        min = tmp;
      }
      return this._theta >= min && this._theta <= max;
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
