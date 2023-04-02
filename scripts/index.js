import { initialCards } from './initial.js';

//---------------------- profile popup fields
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
//---------------------- add place popup fields
const popupInputCaption = document.querySelector('.popup__input_type_caption');
const popupInputLink = document.querySelector('.popup__input_type_link');
//---------------------- picture popup elements
const popupPicture = document.querySelector('.popup__picture');
const popupPictureCaption = document.querySelector('.popup__picture-caption');

//---------------------- profile titles
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

//---------------------- popups windows
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPlace = document.querySelector('.popup_type_add-picture');
const popupZoomPicture = document.querySelector('.popup_type_picture');

//---------------------- popups forms
const profileForm = popupProfile.querySelector('.popup__form');
const addPlaceForm = popupAddPlace.querySelector('.popup__form');

//---------------------- interface buttons
const profileEditBttn = document.querySelector('.profile__edit');
const placeAddBttn = document.querySelector('.profile__add-place');
const popupCloseBttns = document.querySelectorAll('.popup__close');

//---------------------- point for adding place Items in DOM
const places = document.querySelector('.elements');
//----------------------
const placeTemplate = document.querySelector('.template-element').content;

//======================== preparing Place Item - START
const createPlaceItem = (placeData) => {
    const placeItem = placeTemplate.querySelector('.element').cloneNode(true);
    const placeCaption = placeItem.querySelector('.element__name');
    const placePicture = placeItem.querySelector('.element__foto');

    placeCaption.textContent = placeData.name;
    placePicture.src = placeData.link;
    placePicture.alt = placeData.name;

    const likeBttn = placeItem.querySelector('.element__like');
    const deleteBttn = placeItem.querySelector('.element__delete');
    const zoomPicture = placeItem.querySelector('.element__foto');

    const handleLike = () => {
      likeBttn.classList.toggle('element__like_active');
    };

    const handleDelete = () => {
      placeItem.remove();
    };

    const handleZoom = () => {
      popupPicture.src = placePicture.src;
      popupPictureCaption.textContent = placeCaption.textContent;
      popupPicture.alt = placeData.name;
      openPopup (popupZoomPicture);
    };

    likeBttn.addEventListener('click', handleLike);
    deleteBttn.addEventListener('click', handleDelete);
    zoomPicture.addEventListener('click', handleZoom);

    return placeItem;
} //======================== preparing Place Item - END

//======================== show Place Item with data
const renderPlaceItem = (placeItem) => {
  places.prepend(placeItem);
}

//======================== open popup window
function openPopup (popup){
  popup.classList.add('popup_opened');
}

//======================== close popup window
function closePopup (popup){
  popup.classList.remove('popup_opened');
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
  renderPlaceItem(createPlaceItem (placeData));
  closePopup(popupAddPlace);
}

//======================== Load page with some initial place Items
initialCards.forEach((card) => {
  renderPlaceItem(createPlaceItem(card));
});

//======================== Adding Listeners on Bttn

profileEditBttn.addEventListener('click',() => {
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
  openPopup (popupProfile);
});

placeAddBttn.addEventListener('click',() => {
  popupInputCaption.value = '';
  popupInputLink.value = '';
  openPopup (popupAddPlace);
});

popupCloseBttns.forEach( (bttn) => {
  const popup = bttn.closest('.popup');
  bttn.addEventListener ('click', () => closePopup (popup));
});

profileForm.addEventListener('submit', handleSubmitProfile);
addPlaceForm.addEventListener('submit', handleSubmitPlace);
