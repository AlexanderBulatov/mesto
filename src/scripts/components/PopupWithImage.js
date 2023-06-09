import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup__picture');
    this._popupPictureCaption = document.querySelector('.popup__picture-caption');

  }

  open({link, name}){
    this._popupPicture.src = link;
    this._popupPictureCaption.textContent = name;
    this._popupPicture.alt = name;
    super.open();
  }
}
