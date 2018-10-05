'use strict';
(function () {

  // var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  // var ADVERT_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  // var ADVERT_OFFER_TIMES = ['12:00', '13:00', '14:00'];
  // var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var ADVERT_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // var getRandomOrder = function (quantity, startingNumber) {
  //   if (!startingNumber) {
  //     startingNumber = 0;
  //   }
  //   var randomOrder = [];
  //   var orderedArray = [];
  //   for (var i = 0; i < quantity; i++) {
  //     orderedArray.push(i + startingNumber);
  //   }
  //   for (i = 0; i < quantity; i++) {
  //     var randomElement = window.getRandomInt(quantity - i - 1);
  //     randomOrder.push(orderedArray[randomElement]);
  //     orderedArray.splice(randomElement, 1);
  //   }
  //   return randomOrder;
  // };

  // var generateAvatars = function (quantity) {
  //   var randomOrder = getRandomOrder(quantity, 1);
  //   var avatars = [];
  //   for (var i = 0; i < quantity; i++) {
  //     var avatarElement = 'img/avatars/user0' + randomOrder[i] + '.png';
  //     avatars.push(avatarElement);
  //   }
  //   return avatars;
  // };

  // var generateTitles = function (quantity, advTitles) {
  //   var randomOrder = getRandomOrder(quantity);
  //   var titles = [];
  //   for (var i = 0; i < quantity; i++) {
  //     var titleElement = advTitles[randomOrder[i]];
  //     titles.push(titleElement);
  //   }
  //   return titles;
  // };

  // var generateFeatures = function (features) {
  //   var offerFeatures = [];
  //   var numberOfFeatures = window.getRandomInt(features.length, 0);
  //   var chosenFeatures = getRandomOrder(features.length);
  //   for (var i = 0; i < numberOfFeatures; i++) {
  //     offerFeatures.push(features[chosenFeatures[i]]);
  //   }
  //   return offerFeatures;
  // };

  // var generatePhotos = function (photos) {
  //   var offerPhotos = [];
  //   var photosOrder = getRandomOrder(photos.length);
  //   for (var i = 0; i < photos.length; i++) {
  //     offerPhotos.push(photos[photosOrder[i]]);
  //   }
  //   return offerPhotos;
  // };

  // var avatars = generateAvatars(window.util.ADVERT_NUMBER);
  // var titles = generateTitles(window.util.ADVERT_NUMBER, ADVERT_TITLES);

  // var generateAdvert = function (counter, types, times, features, photos) {
  //   var author = {avatar: avatars[counter]};
  //   var location = {x: window.getRandomInt(window.util.MAP_MAX_WIDTH, window.util.MAP_MIN_WIDTH), y: window.getRandomInt(window.util.MAP_MAX_HEIGHT, window.util.MAP_MIN_HEIGHT)};
  //   var offer = {
  //     title: titles[counter],
  //     price: window.getRandomInt(1000000, 1000),
  //     type: types[window.getRandomInt(types.length - 1)],
  //     rooms: window.getRandomInt(5, 1),
  //     guests: window.getRandomInt(10, 1),
  //     checkin: times[window.getRandomInt(times.length - 1)],
  //     checkout: times[window.getRandomInt(times.length - 1)],
  //     features: generateFeatures(features),
  //     description: '',
  //     photos: generatePhotos(photos),
  //     address: location.x + ', ' + location.y
  //   };
  //   var advert = {author: author, offer: offer, location: location};
  //   return advert;
  // };

  // var generateRandomAdverts = function (quantity) {
  //   var adverts = [];
  //   for (var i = 0; i < quantity; i++) {
  //     var advert = generateAdvert(i, ADVERT_OFFER_TYPES, ADVERT_OFFER_TIMES, ADVERT_OFFER_FEATURES, ADVERT_OFFER_PHOTOS);
  //     adverts.push(advert);
  //   }
  //   return adverts;
  // };

  // var adverts = generateRandomAdverts(window.util.ADVERT_NUMBER);

  var successHandler = function (serveradverts) {
    window.data = {
      adverts: serveradverts,
    };
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content;
    var errorNode = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorNode);
  };

  window.load(successHandler, errorHandler);

})();
