const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popup = document.querySelector('.popup');
const pofileEditBttn = document.querySelector('.profile__edit');
const popupSubmitBttn = document.querySelector('.popup__form');
const popupCloseBttn = document.querySelector('.popup__close');

// open popup window
function openPopupProfile (){
  popup.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
}

// close popup window
function closePopupProfile (){
  popup.classList.remove('popup_opened');
}

// submit and close popup window
function handleFormSubmit (e) {
    e.preventDefault();
    profileName.textContent = popupInputName.value;
    profileOccupation.textContent = popupInputOccupation.value;
    closePopupProfile();
}

// add listeners to editing profile and popup btn-s
pofileEditBttn.addEventListener('click',openPopupProfile);
popupCloseBttn.addEventListener('click',closePopupProfile);
popupSubmitBttn.addEventListener('submit', handleFormSubmit);
