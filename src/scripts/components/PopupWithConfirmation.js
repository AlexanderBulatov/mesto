import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitBttn = this._popup.querySelector('.popup__submit-btn');
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const initialText = this._submitBttn.textContent;

      this._submitBttn.textContent = 'Удаление...';

      this._handleSubmitForm(this._card)
        .then(() => {this.close();})
        .finally(() => {
          this._submitBttn.textContent = initialText;
        })
    });
  }




  open(card){
    super.open();
    this._card = card;
  }
}
