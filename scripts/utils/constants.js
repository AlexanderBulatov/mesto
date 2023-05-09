export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

export const validationConfig = {
  formSelector: '.popup__form',                                     //'.popup__form',
  inputSelector: '.popup__input',                                   //'.popup__input',
  submitButtonSelector: '.popup__submit-btn',                       //'.popup__button',
  inactiveButtonClass: 'popup__submit-btn_disable',                 //'popup__button_disabled',
  inputErrorClass: 'popup__input_error',                            //'popup__input_type_error',
  errorClass: 'popup__error_active'                                 //'popup__error_visible'
}
export const popupPicture = document.querySelector('.popup__picture');
export const popupPictureCaption = document.querySelector('.popup__picture-caption');
export const popupZoomPicture = document.querySelector('.popup_type_picture');
