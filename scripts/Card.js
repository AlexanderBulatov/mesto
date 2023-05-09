import { openPopup } from './utils/utils.js';
import { popupPicture, popupPictureCaption, popupZoomPicture } from './utils/constants.js';

export class Card {
  constructor(placeData, placeSelector) {
    this._placeSelector = placeSelector;
    this._name = placeData.name;
    this._link = placeData.link;
  }

  _getPlaceTemplate() {
    this._placeTemplate = document.querySelector(this._placeSelector).content.querySelector('.element').cloneNode(true);
    return this._placeTemplate;
  }

  generateCard() {
    this._element = this._getPlaceTemplate();
    this._likeBttn = this._element.querySelector('.element__like');
    this._deleteBttn = this._element.querySelector('.element__delete');
    this._zoomPicture = this._element.querySelector('.element__foto');
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__foto').src = this._link;
    this._element.querySelector('.element__foto').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLike() {
    this._likeBttn.classList.toggle('element__like_active');
  };

  _handleDelete() {
    this._element.remove();
  };

  _handleZoom() {
    popupPicture.src = this._link;
    popupPictureCaption.textContent = this._name;
    popupPicture.alt = this._name;
    openPopup (popupZoomPicture);
  };

  _setEventListeners() {
    this._likeBttn.addEventListener('click', () => {this._handleLike()});
    this._deleteBttn.addEventListener('click', () => {this._handleDelete()});
    this._zoomPicture.addEventListener('click',() => {this._handleZoom()});
  }
}
