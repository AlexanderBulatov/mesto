export class Card {
  constructor(
    placeData,
    placeSelector,
    userId,
    handleCardClick,
    handleCardLike,
    handleCardDelete) {
      this._placeData = placeData;
      this._name = placeData.name;
      this._link = placeData.link;
      this._userId = userId;
      this._placeSelector = placeSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleCardLike = handleCardLike;
      this._ownerId = placeData.owner._id;
      this._likesInfo = placeData.likes;
      this._cardId = this._placeData._id;
  }

  _isUsersCard(){
   return (this._userId === this._ownerId)
  }
  _isLiked(){
    return this._likeBttn.classList.contains('element__like_active');
  }
  _setLike (){
    this._likeBttn.classList.add('element__like_active');
  }
  _unsetLike(){
    this._likeBttn.classList.remove('element__like_active');
  }

  setRate (likesInfo){
    if (likesInfo.some((like) => {return (like._id===this._userId)})){
      if (!this._isLiked()){
        this._setLike();
      }
    }
    else {
      if (this._isLiked()){
        this._unsetLike();
      }
    }
    this._likeCounter.textContent = likesInfo.length;
  }

  _getPlaceTemplate() {
    this._placeTemplate = document.querySelector(this._placeSelector).content.querySelector('.element').cloneNode(true);
    return this._placeTemplate;
  }

  generateCard() {
    this._element = this._getPlaceTemplate();
    this._likeBttn = this._element.querySelector('.element__like');
    this._deleteBttn = this._element.querySelector('.element__delete');
    this._likeCounter = this._element.querySelector('.element__counter');

    if (!this._isUsersCard()){
      this._deleteBttn.classList.add('element__delete_hidden');
    }
    this.setRate (this._likesInfo);
    this._picture = this._element.querySelector('.element__foto');
    this._element.querySelector('.element__name').textContent = this._name;
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLike() {
    this._handleCardLike(this._isLiked(), this._cardId, this);
  };

    deleteCard (){
      this._element.remove();
    }

    _handleDelete () {
      this._handleCardDelete(this);
    }

  _setEventListeners() {
    this._likeBttn.addEventListener('click', () => {this._handleLike()});
    if (this._isUsersCard()){
      this._deleteBttn.addEventListener('click', () => {this._handleDelete()});
    }
    this._picture.addEventListener(
      'click',
      () => {
        this._handleCardClick(this._placeData)
      }
    );

  }
}
