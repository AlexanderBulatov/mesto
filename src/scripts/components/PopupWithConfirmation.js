import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitBttn = this._popup.querySelector('.popup__submit-btn');
  }

  setEventListeners (){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._card);
    })
  }

  freezeSubmitBttn(bttnCaption){
    this._submitBttn.textContent = bttnCaption;
    this._submitBttn.setAttribute('disabled','');
  }

  unfreezeSubmitBttn(bttnCaption){
    this._popup.addEventListener('transitionend', (e)=>{
     if(e.target.classList.contains(this._popupSelector.slice(1))){
        this._submitBttn.textContent = bttnCaption;
        this._submitBttn.removeAttribute('disabled','');
     }
    })
  }

  open(card){
    super.open();
    this._card = card;
  }
}
