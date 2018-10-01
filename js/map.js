'use strict';
(function () {

  var MAIN_PIN_STARTING_HEIGHT = 375;
  var MAIN_PIN_STARTING_WIDTH = 570;

  var mapSection = document.querySelector('.map');
  var pinOnMap = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  var renderPins = function () {
    for (var i = 0; i < window.util.ADVERT_NUMBER; i++) {
      window.createPin(i);
    }
    pinOnMap.appendChild(window.pin.pinsList);
  };

  var formFields = document.querySelectorAll('fieldset');
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].setAttribute('disabled', 'disabled');
  }

  var mapActivated = false;

  var activateMap = function () {
    mapSection.classList.remove('map--faded');
    var advertSection = document.querySelector('.ad-form');
    advertSection.classList.remove('ad-form--disabled');
    for (i = 0; i < formFields.length; i++) {
      formFields[i].removeAttribute('disabled');
    }
    mapActivated = true;
    renderPins();
  };

  var fillAddress = function () {
    var addressField = document.querySelector('#address');
    var addressX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    var addressY = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + window.util.MAIN_PIN_POINTER);
    addressField.value = addressX + ', ' + addressY;
  };

  var activeMapHandler = function () {
    var advertsOpen = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var advertClose = document.querySelector('.popup__close');
    var advertCard = document.querySelector('article');

    var advertCloseHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closePopup();
      }
    };

    var openPopup = function (counter) {
      advertCard = document.querySelector('article');
      mapSection.removeChild(advertCard);
      window.createAdvert(counter);
      document.addEventListener('keydown', advertCloseHandler);
      advertClose = document.querySelector('.popup__close');
      advertClose.addEventListener('click', function () {
        closePopup();
      });
    };

    var closePopup = function () {
      advertCard = document.querySelector('article');
      advertCard.classList.add('hidden');
      document.removeEventListener('keydown', advertCloseHandler);
    };

    for (i = 0; i < advertsOpen.length; i++) {
      advertsOpen[i].addEventListener('click', openPopup.bind(null, i));
    }

    var roomType = document.querySelector('#type');
    roomType.addEventListener('input', function () {
      var roomPrice = document.querySelector('#price');
      if (roomType.value === 'bungalo') {
        roomPrice.setAttribute('min', '0');
        roomPrice.setAttribute('placeholder', '0');
      }
      if (roomType.value === 'flat') {
        roomPrice.setAttribute('min', '1000');
        roomPrice.setAttribute('placeholder', '1000');
      }
      if (roomType.value === 'house') {
        roomPrice.setAttribute('min', '5000');
        roomPrice.setAttribute('placeholder', '5000');
      }
      if (roomType.value === 'palace') {
        roomPrice.setAttribute('min', '10000');
        roomPrice.setAttribute('placeholder', '10000');
      }
    });

    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');

    timeIn.addEventListener('input', function () {
      timeOut.value = timeIn.value;
    });

    timeOut.addEventListener('input', function () {
      timeIn.value = timeOut.value;
    });

    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var capacityOptions = document.querySelectorAll('#capacity option');

    roomNumber.addEventListener('input', function () {
      if (roomNumber.value === '1') {
        if (capacity.value !== '1') {
          capacity.value = '';
        }
        capacityOptions[0].setAttribute('disabled', 'disabled');
        capacityOptions[1].removeAttribute('disabled');
        capacityOptions[2].setAttribute('disabled', 'disabled');
        capacityOptions[3].setAttribute('disabled', 'disabled');
      }

      if (roomNumber.value === '2') {
        if (capacity.value !== '1' && '2') {
          capacity.value = '';
        }
        capacityOptions[0].setAttribute('disabled', 'disabled');
        capacityOptions[1].removeAttribute('disabled');
        capacityOptions[2].removeAttribute('disabled');
        capacityOptions[3].setAttribute('disabled', 'disabled');
      }

      if (roomNumber.value === '3') {
        if (capacity.value !== '1' && '2' && '3') {
          capacity.value = '';
        }
        capacityOptions[0].setAttribute('disabled', 'disabled');
        capacityOptions[1].removeAttribute('disabled');
        capacityOptions[2].removeAttribute('disabled');
        capacityOptions[3].removeAttribute('disabled');
      }

      if (roomNumber.value === '100') {
        if (capacity.value !== '0') {
          capacity.value = '';
        }
        capacityOptions[0].removeAttribute('disabled');
        capacityOptions[1].setAttribute('disabled', 'disabled');
        capacityOptions[2].setAttribute('disabled', 'disabled');
        capacityOptions[3].setAttribute('disabled', 'disabled');
      }
    });

    var deactivateMap = function () {
      mapSection = document.querySelector('.map');
      mapSection.classList.add('map--faded');
      var advertSection = document.querySelector('.ad-form');
      advertSection.classList.add('ad-form--disabled');
      for (i = 0; i < formFields.length; i++) {
        formFields[i].setAttribute('disabled', 'disabled');
      }
      mapActivated = false;
      for (i = 0; i < window.util.ADVERT_NUMBER; i++) {
        var generatedPin = document.querySelector('.map__pin:not(.map__pin--main)');
        pinOnMap.removeChild(generatedPin);
      }
      closePopup();
      mapSection.removeChild(advertCard);
      mapPinMain.style.top = MAIN_PIN_STARTING_HEIGHT + 'px';
      mapPinMain.style.left = MAIN_PIN_STARTING_WIDTH + 'px';
      clearButton.removeEventListener('click', deactivateMap);
    };

    var clearButton = document.querySelector('.ad-form__reset');
    clearButton.addEventListener('click', deactivateMap);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMain.offsetLeft - shift.x) > (window.util.MAP_MAX_WIDTH - mapPinMain.offsetWidth / 2)) {
        mapPinMain.style.left = (window.util.MAP_MAX_WIDTH - mapPinMain.offsetWidth / 2) + 'px';
      } else if ((mapPinMain.offsetLeft - shift.x) < (window.util.MAP_MIN_WIDTH - mapPinMain.offsetWidth / 2)) {
        mapPinMain.style.left = (window.util.MAP_MIN_WIDTH - mapPinMain.offsetWidth / 2) + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if ((mapPinMain.offsetTop - shift.y) > (window.util.MAP_MAX_HEIGHT - mapPinMain.offsetHeight - window.util.MAIN_PIN_POINTER)) {
        mapPinMain.style.top = (window.util.MAP_MAX_HEIGHT - mapPinMain.offsetHeight - window.util.MAIN_PIN_POINTER) + 'px';
      } else if ((mapPinMain.offsetTop - shift.y) < (window.util.MAP_MIN_HEIGHT - mapPinMain.offsetHeight - window.util.MAIN_PIN_POINTER)) {
        mapPinMain.style.top = (window.util.MAP_MIN_HEIGHT - mapPinMain.offsetHeight - window.util.MAIN_PIN_POINTER) + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
    };

    var mouseUpHandler = function () {
      if (!mapActivated) {
        activateMap();
        window.createAdvert(0);
        document.querySelector('article').classList.add('hidden');
        activeMapHandler();
      }
      fillAddress();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
