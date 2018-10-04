'use strict';
(function () {

  window.getRandomInt = function (max, min) {
    if (!min) {
      min = 0;
    }
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

})();
