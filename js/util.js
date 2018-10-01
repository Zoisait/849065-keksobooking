'use strict';
(function () {

  var ADVERT_NUMBER = 8;
  //   var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  //   var ADVERT_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  //   var ADVERT_OFFER_TYPES_TRANSLATE = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  //   var ADVERT_OFFER_TIMES = ['12:00', '13:00', '14:00'];
  //   var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  //   var ADVERT_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  //   var PIN_WIDTH = 50;
  //   var PIN_HEIGHT = 75;
  var MAIN_PIN_POINTER = 22;
  //   var MAIN_PIN_STARTING_HEIGHT = 375;
  //   var MAIN_PIN_STARTING_WIDTH = 570;
  var MAP_MIN_WIDTH = 1;
  var MAP_MAX_WIDTH = 1200;
  var MAP_MIN_HEIGHT = 150; // в ТЗ указано 130, но точка с координатами 130 за горизонтом
  var MAP_MAX_HEIGHT = 700; // в ТЗ указано 630, но точка с координатами 630 существенно выше меню фильтра
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ADVERT_NUMBER: ADVERT_NUMBER,
    MAP_MIN_WIDTH: MAP_MIN_WIDTH,
    MAP_MAX_WIDTH: MAP_MAX_WIDTH,
    MAP_MIN_HEIGHT: MAP_MIN_HEIGHT,
    MAP_MAX_HEIGHT: MAP_MAX_HEIGHT,
    MAIN_PIN_POINTER: MAIN_PIN_POINTER,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

})();
