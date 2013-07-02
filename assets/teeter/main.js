define(function(require, exports, module) {
  var _ = require('underscore');
  var $ = require('zepto');

  var logger = require('teeter/logger');
  var Ball = require('teeter/ball');


  var win = $(window);

  var ball = new Ball(win.width(), win.height());
  // 电脑调试用
  if (logger.isDebug()) {
    window.ball = ball;
    ball.fakePull = function(beta, gamma) {
      ball.pull({
        beta: beta,
        gamma: gamma
      });
    };
  }

  var handleOrientation = function(evt) {
    var keys = [
      'alpha',
      'beta',
      'gamma',
      'absolute'
    ];
    var angles = {};
    _.each(keys, function(v) {
      var val = evt[v];
      if (_.isNumber(val)) {
        angles[v] = Math.round(val) || 0;
      } else {
        angles[v] = val;
      }
    });

    ball.pull(angles);
    logger.log(angles);

    // log 信息
    // var result = '';
    // _.each(keys, function(v) {
    //   result += v + ' : ' + angles[v] + '<br />';
    // });
    // logger.log(result);
  };
  handleOrientation = _.throttle(handleOrientation, 40);
  win.on('deviceorientation', handleOrientation);


  function setXY(argument) {
    var winWidth = win.width();
    var winHeight = win.height();
    var body = $('body');
    body.css({
      height: winHeight,
      width: winWidth
    });

    ball.setMaxXY(winWidth, winHeight);
  }

  setXY();
  win.on('resize', setXY);
});
