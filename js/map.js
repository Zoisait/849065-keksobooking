'use strict';

var ADVERT_NUMBER = 8;
var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADVERT_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERT_OFFER_TYPES_TRANSLATE = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var ADVERT_OFFER_TIMES = ['12:00', '13:00', '14:00'];
var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var MAIN_PIN_POINTER = 22;
var MAIN_PIN_STARTING_HEIGHT = 375;
var MAIN_PIN_STARTING_WIDTH = 570;
var MAP_MIN_WIDTH = 1;
var MAP_MAX_WIDTH = 1200;
var MAP_MIN_HEIGHT = 150; // в ТЗ указано 130, но точка с координатами 130 за горизонтом
var MAP_MAX_HEIGHT = 700; // в ТЗ указано 630, но точка с координатами 630 существенно выше меню фильтра
var ESC_KEYCODE = 27;

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

  for (i = 1; i < adverts[counter].offer.photos.length; i++) {
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

var formFields = document.querySelectorAll('fieldset');
for (var i = 0; i < formFields.length; i++) {
  formFields[i].setAttribute('disabled', 'disabled');
}
var mapActivated = false;

var activateMap = function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.remove('map--faded');
  var advertSection = document.querySelector('.ad-form');
  advertSection.classList.remove('ad-form--disabled');
  for (i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
  }
  mapActivated = true;
  renderPins();
};

var mapPin = document.querySelector('.map__pin--main');

var fillAddress = function () {
  var addressField = document.querySelector('#address');
  var addressX = Math.floor(mapPin.offsetLeft + mapPin.offsetWidth / 2);
  var addressY = Math.round(mapPin.offsetTop + mapPin.offsetHeight + MAIN_PIN_POINTER);
  addressField.value = addressX + ', ' + addressY;
};

var advertCardHandler = function () {
  var advertsOpen = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var advertClose = document.querySelector('.popup__close');
  var advertCard = document.querySelector('article');

  var advertCloseHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function (counter) {
    advertCard = document.querySelector('article');
    advertWindow.removeChild(advertCard);
    createAdvert(counter);
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

  var deactivateMapHandler = function () {
    var mapSection = document.querySelector('.map');
    mapSection.classList.add('map--faded');
    var advertSection = document.querySelector('.ad-form');
    advertSection.classList.add('ad-form--disabled');
    for (i = 0; i < formFields.length; i++) {
      formFields[i].setAttribute('disabled', 'disabled');
    }
    mapActivated = false;
    for (i = 0; i < ADVERT_NUMBER; i++) {
      var generatedPin = document.querySelector('.map__pin:not(.map__pin--main)');
      pinOnMap.removeChild(generatedPin);
    }
    closePopup();
    advertWindow.removeChild(advertCard);
    mapPin.style.top = MAIN_PIN_STARTING_HEIGHT + 'px';
    mapPin.style.left = MAIN_PIN_STARTING_WIDTH + 'px';
    clearButton.removeEventListener('click', deactivateMapHandler);
  };

  var clearButton = document.querySelector('.ad-form__reset');
  clearButton.addEventListener('click', deactivateMapHandler);
};

mapPin.addEventListener('mousedown', function (evt) {

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPin.offsetLeft - shift.x) > (MAP_MAX_WIDTH - mapPin.offsetWidth / 2)) {
      mapPin.style.left = (MAP_MAX_WIDTH - mapPin.offsetWidth / 2) + 'px';
    } else if ((mapPin.offsetLeft - shift.x) < (MAP_MIN_WIDTH - mapPin.offsetWidth / 2)) {
      mapPin.style.left = (MAP_MIN_WIDTH - mapPin.offsetWidth / 2) + 'px';
    } else {
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
    }

    if ((mapPin.offsetTop - shift.y) > (MAP_MAX_HEIGHT - mapPin.offsetHeight - MAIN_PIN_POINTER)) {
      mapPin.style.top = (MAP_MAX_HEIGHT - mapPin.offsetHeight - MAIN_PIN_POINTER) + 'px';
    } else if ((mapPin.offsetTop - shift.y) < (MAP_MIN_HEIGHT - mapPin.offsetHeight - MAIN_PIN_POINTER)) {
      mapPin.style.top = (MAP_MIN_HEIGHT - mapPin.offsetHeight - MAIN_PIN_POINTER) + 'px';
    } else {
      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
    }
  };

  var onMouseUp = function () {
    if (!mapActivated) {
      activateMap();
      createAdvert(0);
      document.querySelector('article').classList.add('hidden');
      advertCardHandler();
    }
    fillAddress();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
