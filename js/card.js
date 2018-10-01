'use strict';
(function () {

  var ADVERT_OFFER_TYPES_TRANSLATE = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

  var advertTemplate = document.querySelector('#card').content;
  var mapSection = document.querySelector('.map');

  window.createAdvert = function (counter) {
    var advertElement = advertTemplate.cloneNode(true);
    advertElement.querySelector('.popup__title').textContent = window.data.adverts[counter].offer.title;
    advertElement.querySelector('.popup__text--address').textContent = window.data.adverts[counter].offer.address;
    advertElement.querySelector('.popup__text--price').textContent = window.data.adverts[counter].offer.price + '$' + ' /ночь';
    advertElement.querySelector('.popup__type').textContent = ADVERT_OFFER_TYPES_TRANSLATE[window.data.adverts[counter].offer.type];
    advertElement.querySelector('.popup__text--capacity').textContent = window.data.adverts[counter].offer.rooms + ' комнаты для ' + window.data.adverts[counter].offer.guests + ' гостей';
    advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.adverts[counter].offer.checkin + ', выезд до ' + window.data.adverts[counter].offer.checkout + '.';
    advertElement.querySelector('.popup__description').textContent = window.data.adverts[counter].offer.description;
    advertElement.querySelector('.popup__avatar').src = window.data.adverts[counter].author.avatar;
    advertElement.querySelector('.popup__photo:nth-child(1)').src = window.data.adverts[counter].offer.photos[0];

    for (var i = 1; i < window.data.adverts[counter].offer.photos.length; i++) {
      var additionalPhoto = document.createElement('img');
      additionalPhoto.classList.add('popup__photo');
      additionalPhoto.src = window.data.adverts[counter].offer.photos[i];
      additionalPhoto.width = 45;
      additionalPhoto.height = 40;
      additionalPhoto.alt = 'Фотография жилья';
      advertElement.querySelector('.popup__photos').appendChild(additionalPhoto);
    }

    for (i = 0; i < window.data.adverts[counter].offer.features.length; i++) {
      var featureIcon = document.createElement('li');
      var featureIconClass = 'popup__feature--' + window.data.adverts[counter].offer.features[i];
      featureIcon.classList.add('popup__feature');
      featureIcon.classList.add(featureIconClass);
      advertElement.querySelector('.popup__features').appendChild(featureIcon);
    }

    mapSection.insertBefore(advertElement, document.querySelector('.map.map__filters-container'));
  };

})();
