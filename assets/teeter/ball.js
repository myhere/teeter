define(function(require, exports, module) {
  var $ = require('zepto');
  var _ = require('underscore');

  var logger = require('teeter/logger');

  var Velocity = require('teeter/velocity');
  var Acceleration = require('teeter/acceleration');

  function Ball(maxX, maxY) {
    this._node = $('#ball');

    this._radius = 20;

    // 球心坐标
    this._x = 100;
    this._y = 100;

    this._maxY = maxY;
    this._maxX = maxX;

    // 速度
    this._velocity = new Velocity(0, 0);

    // 加速度
    this._acceleration = new Acceleration(0, 0);

    // 帧的时间间隔
    // 1 秒 25 帧
    this._interval = 1000 / 25;

    // 单位时间
    // 一个单位时间, 用于计算球移动位置
    this._unitTime = this._interval * 2;

    this._init();
  }

  Ball.prototype = {
    constructor: Ball,

    _init: function() {
      this._updateUI();
      this._show();

      this._run();
    },

    _run: function() {
      var run = _.bind(function() {
        this._calculatePosition();
        this._updateUI();

        this._runner = setTimeout(run, this._interval);
      }, this);

      this._runner = null;

      run();
    },

    setMaxXY: function(maxX, maxY) {
      this._maxX = maxX;
      this._maxY = maxY;
    },

    pull: function(angles) {
      this._acceleration.calculate(angles);
    },

    getRadius: function() {
      return this._radius;
    },

    _updateUI: function() {
      this._ensureValidPosition();

      this._node.css({
        bottom: this._y - this._radius + 'px',
        left: this._x - this._radius + 'px'
      });
    },

    _calculatePosition: function() {
      var velocityOnX = this._velocity.getOnX();
      var velocityOnY = this._velocity.getOnY();

      var t = this._interval / this._unitTime;
      // 速度调整
      this._velocity.accelerate(this._acceleration, t);

      var newVelocityOnX = this._velocity.getOnX();
      var newVelocityOnY = this._velocity.getOnY();

      // x, y 方向上看做匀加速直线运动
      var displacementOnX = 0.5 * (velocityOnX + newVelocityOnX) * t;
      var displacementOnY = 0.5 * (velocityOnY + newVelocityOnY) * t;

      this._x += displacementOnX;
      this._y += displacementOnY;

      this._x = Math.round(this._x);
      this._y = Math.round(this._y);

      // logger.log('x: ' + this._x + ' y: ' + this._y);
    },

    _show: function() {
      this._node.show();
    },

    /**
     * 确保球心坐标合法
     */
    _ensureValidPosition: function() {
      var r = this._radius;
      var x = Math.round(this._x);
      var y = Math.round(this._y);

      var collideSide;
      // 球心坐标规范
      if (x < r) {
        x = r;
        collideSide = 'left';
      }
      if (x > this._maxX - r) {
        x = this._maxX - r;
        collideSide = 'right';
      }
      if (y < r) {
        y = r;
        collideSide = 'bottom';
      }
      if (y > this._maxY - r) {
        y = this._maxY - r;
        collideSide = 'top';
      }
      this._velocity.collide(collideSide);

      this._x = x;
      this._y = y;
    }
  };

  module.exports = Ball;
});
