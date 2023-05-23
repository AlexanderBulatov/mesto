export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeBttn = this._popup.querySelector('.popup__close');
  }

  _handleEscCLose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscCLose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCLose);
  }

  setEventListeners (){
    this._popup.addEventListener (
      'click',
      (e) => {
              if (e.target===e.currentTarget) {
                this.close();
              }
      }
    );
    this._closeBttn.addEventListener('click', (e) => {this.close();});
  }
}


