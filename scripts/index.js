import { initialCards } from './initial.js';
import { validationConfig } from './validationConfig.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//---------------------- profile popup overlay
const popups = document.querySelectorAll('.popup');

//---------------------- profile popup fields
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
//---------------------- add place popup fields
const popupInputCaption = document.querySelector('.popup__input_type_caption');
const popupInputLink = document.querySelector('.popup__input_type_link');
//---------------------- picture popup elements
export const popupPicture = document.querySelector('.popup__picture');
export const popupPictureCaption = document.querySelector('.popup__picture-caption');

//---------------------- profile titles
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

//---------------------- popups windows
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPlace = document.querySelector('.popup_type_add-picture');
export const popupZoomPicture = document.querySelector('.popup_type_picture');

//---------------------- popups forms
const profileForm = popupProfile.querySelector('.popup__form');
const addPlaceForm = popupAddPlace.querySelector('.popup__form');

//---------------------- popups Submit Buttons
const profileSubmitBttn = popupProfile.querySelector(validationConfig.submitButtonSelector);
const addPlaceSubmitBttn = popupAddPlace.querySelector(validationConfig.submitButtonSelector);

//---------------------- interface buttons
const profileEditBttn = document.querySelector('.profile__edit');
const placeAddBttn = document.querySelector('.profile__add-place');
const popupCloseBttns = document.querySelectorAll('.popup__close');

//---------------------- point for adding place Items in DOM
const places = document.querySelector('.elements');

//======================== show Place Item with data

const addCard = (placeData, templateSelector) => {
  const card = new Card(placeData, templateSelector);
  const cardElement = card.generateCard();
  renderPlaceItem(cardElement);
}

const renderPlaceItem = (placeItem) => {
  places.prepend(placeItem);
}

const closeOnKeyEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
}
//======================== open popup window
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closeOnKeyEscape);
}

//======================== close popup window
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closeOnKeyEscape);
}

//======================== Submit handles

const handleSubmitProfile = (e) => {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileOccupation.textContent = popupInputOccupation.value;
  closePopup(popupProfile);
}

const handleSubmitPlace = (e) => {
  e.preventDefault();
  const placeCaption = popupInputCaption.value;
  const placeLink = popupInputLink.value;
  const placeData = {
    name: placeCaption,
    link: placeLink
  };
  addCard(placeData, '.template-element');
  closePopup(popupAddPlace);
  e.target.reset();
}

initialCards.forEach((item) => {
  addCard(item, '.template-element');
});

//======================== Adding Listeners on Bttn
const profileFormValidator = new FormValidator (validationConfig, profileForm);
const addPlaceFormValidator = new FormValidator (validationConfig, addPlaceForm);
profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

profileForm.addEventListener('submit', handleSubmitProfile);
addPlaceForm.addEventListener('submit', handleSubmitPlace);

profileEditBttn.addEventListener('click',() => {
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
  openPopup(popupProfile);
  profileFormValidator.clearError(popupProfile); //-------------------------------
  profileFormValidator.enableSubmitBttn(profileSubmitBttn);//===================
});

placeAddBttn.addEventListener('click',() => {
  openPopup (popupAddPlace);
  addPlaceFormValidator.disableSubmitBttn(addPlaceSubmitBttn); //==================
});

popupCloseBttns.forEach( (bttn) => {
  const popup = bttn.closest('.popup');
  bttn.addEventListener ('click', () => closePopup (popup));
});

//======================== close popups by overlay click
popups.forEach((popup) => {
  popup.addEventListener ('click', (e) => {
    if (e.target===e.currentTarget) {
      closePopup (popup);
    }
  });
});
