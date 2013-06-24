define(function(require, exports, module) {
  exports.suffle = function(arr) {
    for (var i = 0, l = arr.length; i < l; i ++) {
      var idx = Math.floor(l * Math.random());

      var tmp;
      if (idx !== i) {
        tmp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = tmp;
      }
    }

    return arr;
  };
});

