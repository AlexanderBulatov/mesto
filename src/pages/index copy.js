import '../pages/index.css';
import { initialCards, validationConfig,
         popupInputName,
         popupInputOccupation,
         profileEditBttn,
         placeAddBttn,
         formValidators
        } from '../scripts/utils/constants.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Api } from '../scripts/components/Api.js';
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

const createCard = (item) =>{
  const card = new Card(
    item,
    '.template-element',
    handleCardClick
  );
  return card.generateCard();
}

const placeSectionRenderer = (item) => {
  const place = createCard(item);
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
          const { name, occupation } = userInfo.getUserInfo();
          popupInputName.value = name;
          popupInputOccupation.value = occupation;
          popupProfile.open();
          formValidators['profile-edit'].clearError();
          formValidators['profile-edit'].enableSubmitBttn();
        }
);

placeAddBttn.addEventListener (
  'click',
  () => {
          formValidators['add-picture'].clearError();
          formValidators['add-picture'].disableSubmitBttn();
          popupAddPlace.open();
        }

);
//===========================================================================


//-----------------Validation form On-------------------------
const enableValidationForms = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidationForms(validationConfig);
//=====================================================================






