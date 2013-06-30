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

    // logger.log('maxX: ' + this._maxX + '<br />maxY: ' + this._maxY);

    // 速度
    this._velocity = new Velocity(0, 0);

    // 加速度
    this._acceleration = new Acceleration(0, 0);

    // 1 秒 25 帧
    // 每一帧为一个单位时间, 用于计算球移动位置
    this._framesPerSecond = 25;

    this._init();
  }

  Ball.prototype = {
    constructor: Ball,

    _init: function() {
      this.moveTo(this._x, this._y);
      this._show();

      this._run();
    },

    _run: function() {
      var run = _.bind(function() {
        var position = this._calculatePosition();
        this.moveTo(position.x, position.y);

        this._runner = setTimeout(run, this._interval);
      }, this);

      this._runner = null;
      this._interval = 1000 / this._framesPerSecond;

      run();
    },

    pull: function(angles) {
      this._acceleration.calculate(angles);
    },

    getRadius: function() {
      return this._radius;
    },

    moveTo: function(x, y) {
      var coord = this._transformCoord({
        x: x,
        y: y
      });

      this._node.css({
        bottom: coord.y + 'px',
        left: coord.x + 'px'
      });
    },

    _calculatePosition: function() {
      return {
        x: this._maxX * Math.random(),
        y: this._maxY * Math.random()
      };
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

      return {
        x: x - r,
        y: y - r
      }
    }
  };

  module.exports = Ball;
});
