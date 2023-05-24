export const initialCards = [
  {
    name: 'Светлогорск',
    link: 'https://images.unsplash.com/photo-1679262353511-7af7fb4c48f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=666&q=80'
  },
  {
    name: 'Тверь',
    link: 'https://images.unsplash.com/photo-1641297136561-17697bdb017b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1634545042913-fd935f23b144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Рязань',
    link: 'https://images.unsplash.com/photo-1682489458980-1e812d2eeb16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1578377983659-18b3443b7cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
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

export const formValidators = {};

export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputOccupation = document.querySelector('.popup__input_type_occupation');

export const profileEditBttn = document.querySelector('.profile__edit');
export const placeAddBttn = document.querySelector('.profile__add-place');
