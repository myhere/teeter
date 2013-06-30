define(function(require, exports, module) {
  var _ = require('underscore');
  var $ = require('zepto');

  var logger = require('teeter/logger');
  var Ball = require('teeter/ball');

  var ball = new Ball();

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
        angles[v] = Math.round(val);
      } else {
        angles[v] = val;
      }
    });

    ball.pull(angles);

    // log 信息
    // var result = '';
    // _.each(keys, function(v) {
    //   result += v + ' : ' + angles[v] + '<br />';
    // });
    // logger.log(result);
  };

  handleOrientation = _.throttle(handleOrientation, 200);

  $(window).on('deviceorientation', handleOrientation);
});
