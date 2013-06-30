define(function(require, exports, module) {
  var $ = require('zepto');
  var _ = require('underscore');

  var logger = require('teeter/logger');

  var Velocity = require('teeter/velocity');
  var Acceleration = require('teeter/acceleration');

  function Ball() {
    this._node = $('#ball');

    this._radius = 20;

    // 当前坐标
    this._x = 30;
    this._y = 30;

    var win = $(window);
    this._maxY = win.height();
    this._maxX = win.width();

    // 速度
    this._velocity = new Velocity(0, 0);

    // 加速度
    this._acceleration = new Acceleration(0, 0);

    // 帧的时间间隔
    // 1 秒 25 帧
    this._interval = 1000 / 25;

    // 单位时间
    // 每一帧为一个单位时间, 用于计算球移动位置
    this._unitTime = this._interval;

    this._init();
  }

  Ball.prototype = {
    constructor: Ball,

    _init: function() {
      this._moveTo();
      this._show();

      this._run();
    },

    _run: function() {
      var run = _.bind(function() {
        this._calculatePosition();
        this._moveTo();

        this._runner = setTimeout(run, this._interval);
      }, this);

      this._runner = null;

      run();
    },

    pull: function(angles) {
      this._acceleration.calculate(angles);
    },

    getRadius: function() {
      return this._radius;
    },

    _moveTo: function() {
      this._transformCoord({
        x: this._x,
        y: this._y
      });


      this._node.css({
        bottom: this._y + 'px',
        left: this._x + 'px'
      });
    },

    _calculatePosition: function() {
      var velocityOnX = this._velocity.getOnX();
      var velocityOnY = this._velocity.getOnY();

      this._velocity.accelerate(this._acceleration, this._interval / this._unitTime);

      var newVelocityOnX = this._velocity.getOnX();
      var newVelocityOnY = this._velocity.getOnY();

      // x, y 方向上看做匀加速直线运动
      var displacementOnX = 0.5 * (velocityOnX + newVelocityOnX);
      var displacementOnY = 0.5 * (velocityOnY + newVelocityOnY);

      this._x += displacementOnX;
      this._y += displacementOnY;
    },

    _show: function() {
      this._node.show();
    },

    /**
     * 将球心坐标转换为球左下角坐标
     */
    _transformCoord: function(coord) {
      var r = this._radius;
      var x = Math.round(coord.x);
      var y = Math.round(coord.y);

      // 球心坐标规范
      if (x < r) {
        x = r;
      }
      if (x > this._maxX - r) {
        x = this._maxX - r;
      }
      if (y < r) {
        y = r;
      }
      if (y > this._maxY - r) {
        y = this._maxY - r;
      }

      this._x = x - r;
      this._y = y - r;
    }
  };

  module.exports = Ball;
});
