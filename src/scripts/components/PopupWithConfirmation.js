import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners (){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._card);
    })
}

  open(card){
    super.open();
    this._card = card;
  }
}
