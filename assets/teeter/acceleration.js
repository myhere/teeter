define(function(require, exports, module) {
  var logger = require('teeter/logger');

  function Acceleration(value, theta) {
    this._value = value;
    this._theta = theta;

    // 加速度最大值
    this._MAX_VALUE = 4;
  }

  Acceleration.prototype = {
    constructor: Acceleration,

    getOnX: function() {
      return this._value * Math.cos(this._theta);
    },

    getOnY: function() {
      return this._value * Math.sin(this._theta);
    },

    getTheta: function() {
      return this._theta;
    },

    set: function(value, theta) {
      this._value = value;
      this._theta = theta;
    },

/*
        y
       |   .
       |
       |
-------|--------> x
       |
       |
       |

beta:  绕 x 旋转
gamma: 绕 y 旋转
*/
    // 将手机旋转角度转为球加速度
    calculate: function(angles) {
      var value,
          theta;

      var beta = angles.beta || 0,
          gamma = angles.gamma || 0;

      // 与水平面夹角
      var omega;

      if (gamma === 0) {
        if (beta > 0) {
          theta = 1.5 * Math.PI;
        } else {
          theta = 0.5 * Math.PI;
        }
        omega = beta / 180 * Math.PI;
      } else {
        var ratio = beta / gamma;
        var atan = Math.atan(ratio);
        if (ratio === 0) {
          if (gamma > 0) {
            theta = 0;
          } else {
            theta = Math.PI;
          }
        } else if (ratio > 0) {
          // 第 4 象限
          if (gamma > 0) {
            theta =  2 * Math.PI - atan;
          }
          // 第 2 象限
          else {
            theta =  Math.PI - atan;
          }
        } else {
          // 第 1 象限
          if (gamma > 0) {
            theta = -atan;
          }
          // 第 3 象限
          else {
            theta = Math.PI - atan;
          }
        }

        beta = Math.abs(beta);
        gamma = Math.abs(gamma);
        var y = 1 - Math.sin(beta) * Math.sin(gamma);
        var x = Math.sqrt((1 - Math.cos(beta)) * (1 - Math.cos(beta)) + (1 - Math.cos(gamma)) * (1 - Math.cos(gamma)));
        omega = Math.atan(y / x);
      }

      omega = Math.abs(omega);
      if (omega == 0) {
        value = 0;
      } else {
        value = this._MAX_VALUE * Math.sin(omega);
      }

      this._value = value;
      this._theta = theta;
      this.set(value, theta);

      // var html = 'beta: ' + beta + '<br />' +
      //            'gamma: ' + gamma + '<br />' +
      //            'theta: ' + theta / Math.PI * 180 + '<br />';
      // logger.log(html);
      logger.log('acceleration: theta:' + (theta / Math.PI * 180) + ' value: ' + value);
    }
  };

  module.exports = Acceleration;
});
