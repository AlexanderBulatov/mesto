export class Card {
  constructor(placeData, placeSelector, handleCardClick, userId, api) {
    this._placeSelector = placeSelector;
    this._placeData = placeData;
    this._name = placeData.name;
    this._link = placeData.link;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = placeData.owner._id;
    this._likesInfo = placeData.likes;
    //this._likeCounter = this._likesInfo.length;
    this._api = api;
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

  _setRate (likesInfo){
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
    this._setRate (this._likesInfo);
    this._picture = this._element.querySelector('.element__foto');
    this._element.querySelector('.element__name').textContent = this._name;
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLike() {
    if (!this._isLiked()){
      this._api.setLike(this._cardId)
      .then ((cardInfo) =>{
        this._setRate(cardInfo.likes);
      })
    }
    else {
      this._api.deleteLike(this._cardId)
      .then ((cardInfo) =>{
        this._setRate(cardInfo.likes);
        console.log(cardInfo.likes);
      })
    }
  };

  _handleDelete() {
    this._element.remove();
  };

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
