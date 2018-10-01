'use strict';
(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 75;
  var pinTemplate = document.querySelector('#pin').content;
  var pinsList = document.createDocumentFragment();

  window.createPin = function (counter) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinLocation = {x: window.data.adverts[counter].location.x - PIN_WIDTH / 2, y: window.data.adverts[counter].location.y - PIN_HEIGHT};
    var advertLocation = 'left: ' + pinLocation.x + 'px; top: ' + pinLocation.y + 'px;';
    pinElement.querySelector('.map__pin').style = advertLocation;
    pinElement.querySelector('img').src = window.data.adverts[counter].author.avatar;
    pinElement.querySelector('img').alt = window.data.adverts[counter].offer.title;
    pinsList.appendChild(pinElement);
  };

  window.pin = {
    pinsList: pinsList,
  };

})();
