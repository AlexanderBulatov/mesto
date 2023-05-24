export class Card {
  constructor(placeData, placeSelector, handleCardClick) {
    this._placeSelector = placeSelector;
    this._placeData = placeData;
    this._name = placeData.name;
    this._link = placeData.link;
    this._handleCardClick = handleCardClick;
  }

  _getPlaceTemplate() {
    this._placeTemplate = document.querySelector(this._placeSelector).content.querySelector('.element').cloneNode(true);
    return this._placeTemplate;
  }

  generateCard() {
    this._element = this._getPlaceTemplate();
    this._likeBttn = this._element.querySelector('.element__like');
    this._deleteBttn = this._element.querySelector('.element__delete');
    this._picture = this._element.querySelector('.element__foto');
    this._element.querySelector('.element__name').textContent = this._name;
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
S
  _handleLike() {
    this._likeBttn.classList.toggle('element__like_active');
  };

  _handleDelete() {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeBttn.addEventListener('click', () => {this._handleLike()});
    this._deleteBttn.addEventListener('click', () => {this._handleDelete()});
    this._picture.addEventListener(
      'click',
      () => {
        this._handleCardClick(this._placeData)
      }
    );

  }
}
