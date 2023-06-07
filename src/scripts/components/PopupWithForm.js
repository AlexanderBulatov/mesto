import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitBttn = this._popup.querySelector('.popup__submit-btn');
  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value;});
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const initialText = this._submitBttn.textContent;

      this._submitBttn.textContent = 'Сохранение...';

      this._handleSubmitForm(this._getInputValues())
        .then(() => {this.close();})
        .finally(() => {
          this._submitBttn.textContent = initialText;
        })
    });
  }

  close(){
    super.close();
    this._popupForm.reset();
  }

}
