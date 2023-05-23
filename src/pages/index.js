import '../pages/index.css';
import { initialCards, validationConfig,
         popupInputName,
         popupInputOccupation,
         profileEditBttn,
         placeAddBttn,
         profileFormSelector,
         addPlaceFormSelector
        } from '../scripts/utils/constants.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { FormValidator } from '../scripts/utils/FormValidator.js';

//===================================================================

//-----------------Zooming Cards (Image Popup)------------------------

const imagePopup = new PopupWithImage (
  '.popup_type_picture'
);
imagePopup.setEventListeners();
//===================================================================

//-----------------Profile-------------------------
const userInfo = new UserInfo (
  {
    userNameSelector: '.profile__name',
    userOccupationSelector:'.profile__occupation'
  }
);

const handleProfileSubmit = (inputValues) => {
  userInfo.setUserInfo(
    inputValues['profile-name'],
    inputValues['profile-occupation']
  );
  popupProfile.close();
}

const popupProfile = new PopupWithForm (
  '.popup_type_profile',
  handleProfileSubmit
);
popupProfile.setEventListeners();
//===================================================================

//-----------------AddPlace-------------------------
const handleAddPlaceSubmit = (inputValues) => {
  placeSectionRenderer({
    name: inputValues['picture-caption'],
    link: inputValues['picture-link']
  });
}

const popupAddPlace = new PopupWithForm (
  '.popup_type_add-picture',
  handleAddPlaceSubmit
);

popupAddPlace.setEventListeners();
//===================================================================


//-----------------init Cards------------------------
const handleCardClick = (placeData) => {
  imagePopup.open({
    name: placeData.name,
    link: placeData.link
  });
};

const placeSectionRenderer = (item) => {
  const card = new Card(
    item,
    '.template-element',
    handleCardClick
  );
  const place = card.generateCard();
  placeList.addItem (place);
}

const placeList = new Section (
    { items: initialCards,
      renderer: placeSectionRenderer
    },
    '.elements'
  );

placeList.renderItems();
//===================================================================

//-----------------Interface Bttns Interaction-------------------------
profileEditBttn.addEventListener (
  'click',
  () => {
          popupInputName.value = userInfo.getUserInfo().name;
          popupInputOccupation.value = userInfo.getUserInfo().occupation;
          popupProfile.open();
          profileFormValidator.clearError();
          profileFormValidator.enableSubmitBttn();
        }

);

placeAddBttn.addEventListener (
  'click',
  () => {
          addPlaceFormValidator.clearError();
          popupAddPlace.open();
        }

);

const profileFormValidator = new FormValidator (validationConfig, profileFormSelector);
const addPlaceFormValidator = new FormValidator (validationConfig, addPlaceFormSelector);
profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();





