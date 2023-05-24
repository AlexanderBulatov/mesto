import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value;});
    return this._formValues;
  }

  setEventListeners (){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    })
}

  close(){
    super.close();
    this._popupForm.reset();
  }
}
