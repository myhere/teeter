define(function(require, exports, module) {
  var logger = require('teeter/logger');

  function Acceleration(value, theta) {
    this._value = value;
    this._theta = theta;
  }

  Acceleration.prototype = {
    constructor: Acceleration,

    getOnX: function() {
      return this._value * Math.cos(this._theta);
    },

    getOnY: function() {
      return this._value * Math.sin(this._theta);
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

      var beta = angles.beta,
          gamma = angles.gamma;

      if (gamma === 0) {
        value = 1;
        if (beta > 0) {
          theta = 1.5 * Math.PI;
        } else {
          theta = 0.5 * Math.PI;
        }
      } else {
        value = 1;
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
      }

      this._value = value;
      this._theta = theta;
      this.set(value, theta);

      // var html = 'beta: ' + beta + '<br />' +
      //            'gamma: ' + gamma + '<br />' +
      //            'theta: ' + theta / Math.PI * 180 + '<br />';
      // logger.log(html);
    }
  };

  module.exports = Acceleration;
});
