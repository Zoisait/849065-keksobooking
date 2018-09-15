'use strict';

var ADVERT_NUMBER = 8;
var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADVERT_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERT_OFFER_TYPES_TRANSLATE = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var ADVERT_OFFER_TIMES = ['12:00', '13:00', '14:00'];
var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_MIN_WIDTH = 30;
var MAP_MAX_WIDTH = 1170;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;

var getRandomInt = function (max, min) {
  if (!min) {
    min = 0;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomOrder = function (quantity, startingNumber) {
  if (!startingNumber) {
    startingNumber = 0;
  }
  var randomOrder = [];
  var orderedArray = [];
  for (var i = 0; i < quantity; i++) {
    orderedArray.push(i + startingNumber);
  }
  for (i = 0; i < quantity; i++) {
    var randomElement = getRandomInt(quantity - i - 1);
    randomOrder.push(orderedArray[randomElement]);
    orderedArray.splice(randomElement, 1);
  }
  return randomOrder;
};

var generateAvatars = function (quantity) {
  var randomOrder = getRandomOrder(quantity, 1);
  var avatars = [];
  for (var i = 0; i < quantity; i++) {
    var avatarElement = 'img/avatars/user0' + randomOrder[i] + '.png';
    avatars.push(avatarElement);
  }
  return avatars;
};

var generateTitles = function (quantity, advTitles) {
  var randomOrder = getRandomOrder(quantity);
  var titles = [];
  for (var i = 0; i < quantity; i++) {
    var titleElement = advTitles[randomOrder[i]];
    titles.push(titleElement);
  }
  return titles;
};

var generateFeatures = function (features) {
  var offerFeatures = [];
  var numberOfFeatures = getRandomInt(features.length, 0);
  var chosenFeatures = getRandomOrder(features.length);
  for (var i = 0; i < numberOfFeatures; i++) {
    offerFeatures.push(features[chosenFeatures[i]]);
  }
  return offerFeatures;
};

var generatePhotos = function (photos) {
  var offerPhotos = [];
  var photosOrder = getRandomOrder(photos.length);
  for (var i = 0; i < photos.length; i++) {
    offerPhotos.push(photos[photosOrder[i]]);
  }
  return offerPhotos;
};

var avatars = generateAvatars(ADVERT_NUMBER);
var titles = generateTitles(ADVERT_NUMBER, ADVERT_TITLES);

var generateAdvert = function (counter, types, times, features, photos) {
  var author = {avatar: avatars[counter]};
  var location = {x: getRandomInt(MAP_MAX_WIDTH, MAP_MIN_WIDTH), y: getRandomInt(MAP_MAX_HEIGHT, MAP_MIN_HEIGHT)};
  var offer = {
    title: titles[counter],
    price: getRandomInt(1000000, 1000),
    type: types[getRandomInt(types.length - 1)],
    rooms: getRandomInt(5, 1),
    guests: getRandomInt(10, 1),
    checkin: times[getRandomInt(times.length - 1)],
    checkout: times[getRandomInt(times.length - 1)],
    features: generateFeatures(features),
    description: '',
    photos: generatePhotos(photos),
    address: location.x + ', ' + location.y
  };
  var advert = {author: author, offer: offer, location: location};
  return advert;
};

var generateRandomAdverts = function (quantity) {
  var adverts = [];
  for (var i = 0; i < quantity; i++) {
    var advert = generateAdvert(i, ADVERT_OFFER_TYPES, ADVERT_OFFER_TIMES, ADVERT_OFFER_FEATURES, ADVERT_OFFER_PHOTOS);
    adverts.push(advert);
  }
  return adverts;
};

var adverts = generateRandomAdverts(ADVERT_NUMBER);
var pinOnMap = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var pinsList = document.createDocumentFragment();

var createPin = function (counter) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinLocation = {x: adverts[counter].location.x - PIN_WIDTH / 2, y: adverts[counter].location.y - PIN_HEIGHT};
  var advertLocation = 'left: ' + pinLocation.x + 'px; top: ' + pinLocation.y + 'px;';
  pinElement.querySelector('.map__pin').style = advertLocation;
  pinElement.querySelector('img').src = adverts[counter].author.avatar;
  pinElement.querySelector('img').alt = adverts[counter].offer.title;
  pinsList.appendChild(pinElement);
};

var createPinsList = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    createPin(i);
  }
  return pinsList;
};

var renderPins = function () {
  pinsList = createPinsList(ADVERT_NUMBER);
  pinOnMap.appendChild(pinsList);
};

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

renderPins();

var advertTemplate = document.querySelector('#card').content;
var advertWindow = document.querySelector('.map');

var createAdvert = function (counter) {
  var advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = adverts[counter].offer.title;
  advertElement.querySelector('.popup__text--address').textContent = adverts[counter].offer.address;
  advertElement.querySelector('.popup__text--price').textContent = adverts[counter].offer.price + '$' + ' /ночь';
  advertElement.querySelector('.popup__type').textContent = ADVERT_OFFER_TYPES_TRANSLATE[adverts[counter].offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = adverts[counter].offer.rooms + ' комнаты для ' + adverts[counter].offer.guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adverts[counter].offer.checkin + ', выезд до ' + adverts[counter].offer.checkout + '.';
  advertElement.querySelector('.popup__description').textContent = adverts[counter].offer.description;
  advertElement.querySelector('.popup__avatar').src = adverts[counter].author.avatar;
  advertElement.querySelector('.popup__photo:nth-child(1)').src = adverts[counter].offer.photos[0];

  for (var i = 1; i < adverts[counter].offer.photos.length; i++) {
    var additionalPhoto = document.createElement('img');
    additionalPhoto.classList.add('popup__photo');
    additionalPhoto.src = adverts[counter].offer.photos[i];
    additionalPhoto.width = 45;
    additionalPhoto.height = 40;
    additionalPhoto.alt = 'Фотография жилья';
    advertElement.querySelector('.popup__photos').appendChild(additionalPhoto);
  }

  for (i = 0; i < adverts[counter].offer.features.length; i++) {
    var featureIcon = document.createElement('li');
    var featureIconClass = 'popup__feature--' + adverts[counter].offer.features[i];
    featureIcon.classList.add('popup__feature');
    featureIcon.classList.add(featureIconClass);
    advertElement.querySelector('.popup__features').appendChild(featureIcon);
  }

  advertWindow.insertBefore(advertElement, document.querySelector('.map.map__filters-container'));
};

createAdvert(0);
