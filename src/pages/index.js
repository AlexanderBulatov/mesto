import '../pages/index.css';
import { validationConfig,
         popupInputName,
         popupInputOccupation,
         popupInputAvatar,
         profileEditBttn,
         placeAddBttn,
         formValidators,
         avatar
        } from '../scripts/utils/constants.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { Api } from '../scripts/components/Api.js';
import { FormValidator } from '../scripts/utils/FormValidator.js';
//===================================================================

//----------------- Handlers for Popup Constructor ------------------------

//----------------- Confirm Popup Handler ------------------------
const handleConfirmPopup = (card)=>{
  popupConfirm.freezeSubmitBttn('Удаление...');
  api.deleteCard(card._cardId)
  .then(()=>{
      card.deleteCard();
      popupConfirm.close();
      popupConfirm.unfreezeSubmitBttn('Да');
    }
  ).catch(handleError);
}
//----------------- Profile Popup Handler ------------------------
const handleProfileSubmit = (inputValues) => {
  popupProfile.freezeSubmitBttn('Сохранение...');
  api.setUserInfo(inputValues['profile-name'], inputValues['profile-occupation'])
    .then((userInfoServer) =>{
      userInfo.setUserInfo(userInfoServer.name, userInfoServer.about);
      popupProfile.close();
      popupProfile.unfreezeSubmitBttn('Сохранить');
      }
    )
    .catch(handleError);
}
//----------------- AddPlace Popup Handler ------------------------
const handleAddPlaceSubmit = (inputValues) => {
  popupAddPlace.freezeSubmitBttn('Сохранение...');
  api.setCard(inputValues['picture-caption'], inputValues['picture-link'])
    .then((newCard) => {
          placeSectionRenderer(newCard);
          popupAddPlace.close();
          popupAddPlace.unfreezeSubmitBttn('Создать');
      }
    )
    .catch(handleError);
}
//----------------- Avatar Popup Handler ------------------------
const handleAvatarSubmit = (inputValues) => {
  popupAvatar.freezeSubmitBttn('Сохранение...');
  api.setAvatar(inputValues['avatar-link'])
  .then((res)=>{
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
      popupAvatar.unfreezeSubmitBttn('Создать');
    }
  )
  .catch(handleError);
}

//----------------- Popups init ------------------------
//----------------- Zoom Popup ------------------------
const imagePopup = new PopupWithImage (
  '.popup_type_picture'
);
imagePopup.setEventListeners();
//----------------- Confirm Card Delete Popup ------------------------
const popupConfirm = new PopupWithConfirmation (
  '.popup_type_confirm',
  handleConfirmPopup
);
popupConfirm.setEventListeners();
//----------------- Profile Popup ------------------------
const popupProfile = new PopupWithForm (
  '.popup_type_profile',
  handleProfileSubmit
);
popupProfile.setEventListeners();
//----------------- AddPlace Popup ------------------------
const popupAddPlace = new PopupWithForm (
  '.popup_type_add-picture',
  handleAddPlaceSubmit
);
popupAddPlace.setEventListeners();
//----------------- Avatar Popup ------------------------
const popupAvatar = new PopupWithForm (
  '.popup_type_avatar',
  handleAvatarSubmit
);
popupAvatar.setEventListeners();

//----------------- Handlers for Card Constructor ------------------------
//----------------- Click Handler ------------------------
const handleCardClick = (placeData) => {
  imagePopup.open({
    name: placeData.name,
    link: placeData.link
  });
}
//----------------- Like Handler ------------------------
const handleCardLike = (isLiked, cardId, card) => {
  if (!isLiked){
    api.setLike(cardId)
    .then ((cardInfo) =>{
      card.setRate(cardInfo.likes);
    })
    .catch(handleError);
  }
  else {
    api.deleteLike(cardId)
    .then ((cardInfo) =>{
      card.setRate(cardInfo.likes);
    })
    .catch(handleError);
  }
}
//----------------- Delete Handler ------------------------
const handleCardDelete = (card) =>{
  popupConfirm.open(card);
}

const createCard = (item) =>{
  const card = new Card(
    item,
    '.template-element',
    userId,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  );
  return card.generateCard();
}

//-----------------Page init-------------------------
const api = new Api({
  initUrlApi: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '5852ae18-3c59-4495-8516-a5afb3a9d703',
    'Content-Type': 'application/json'
  }
});
const handleError = (err) => {
  console.log(err);
}

const userInfo = new UserInfo ({
  userNameSelector: '.profile__name',
  userOccupationSelector:'.profile__occupation',
  userAvatarSelector: '.profile__foto'
  }
);

api.getUserInfo()
.then((userInfoServer)=>{
    userInfo.setUserInfo(userInfoServer.name, userInfoServer.about);
    userInfo.setAvatar(userInfoServer.avatar);
  }
).catch(handleError);

const placeSectionRenderer = (item) => {
  const place = createCard(item);
  placeList.addItem (place);
}

const placeList = new Section (placeSectionRenderer, '.elements');

let userId = null;

api.getInitCardsAndUserInfo()
  .then(([ receivedCards, userInfo ]) => {
      userId = userInfo._id;
      placeList.renderItems(receivedCards);
    }
  ).catch(handleError);



//-----------------Interface Bttns Interaction-------------------------
profileEditBttn.addEventListener (
  'click',
  () => {
          const { name, occupation } = userInfo.getUserInfo();
          popupInputName.value = name;
          popupInputOccupation.value = occupation;
          formValidators['profile-edit'].clearError();
          formValidators['profile-edit'].enableSubmitBttn();
          popupProfile.open();
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

avatar.addEventListener (
  'click',
  () => {
          userInfo.getAvatarLink();
          popupInputAvatar.value = userInfo.getAvatarLink();
          console.log(userInfo.getAvatarLink());
          formValidators['change-avatar'].clearError();
          formValidators['change-avatar'].enableSubmitBttn();
          popupAvatar.open();
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

//---------------------- just for server tests------------------
// document.querySelector('.header__logo').addEventListener('dblclick', ()=>{
//   api.getHarryPotter()
//   .then((res) =>{
//     for (let i = 0; i < 30; i++) {
//       console.log(res[i].name);
//       console.log(res[i].image);
//       api.setCard(res[i].name, res[i].image).catch(err => console.log(err));
//     }
//   });
// });
