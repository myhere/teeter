define(function(require, exports, module) {
  var _ = require('underscore');
  var $ = require('zepto');


  var CircleBox = require('lottery/circle-box');
  var Circle = require('lottery/circle');

  var data = require('data/data');

  $(function() {
    $('#start').on('click', function(evt) {
      var box = new CircleBox();
      _.each(data, function(item) {
        var c = new Circle(item);

        box.add(c);
      });
      alert(1);
    });
  });
});
