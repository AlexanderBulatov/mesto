import '../pages/index.css';
import { validationConfig,
         popupInputName,
         popupInputOccupation,
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

const api = new Api({
  initUrlApi: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '5852ae18-3c59-4495-8516-a5afb3a9d703',
    'Content-Type': 'application/json'
  }
});

let userId = null;

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
});
//-----------------Zooming Cards (Image Popup)------------------------

const imagePopup = new PopupWithImage (
  '.popup_type_picture'
);
imagePopup.setEventListeners();
//===================================================================

const handleConfirmPopup = (card)=>{
  console.log(card);
  api.deleteCard(card._cardId).then(()=>{card.deleteCard(); popupConfirm.close()})
}

const popupConfirm = new PopupWithConfirmation (
  '.popup_type_confirm',
  handleConfirmPopup
);
popupConfirm.setEventListeners();

const handleCardDelete = (card) =>{
  popupConfirm.open(card);
}


//-----------------Profile-------------------------



const handleProfileSubmit = (inputValues) => {
  api.setUserInfo(inputValues['profile-name'], inputValues['profile-occupation'])
    .then((userInfoServer) =>{
      userInfo.setUserInfo(userInfoServer.name, userInfoServer.about);
      }
    )
}

const popupProfile = new PopupWithForm (
  '.popup_type_profile',
  handleProfileSubmit
);
popupProfile.setEventListeners();
//===================================================================

//-----------------Avatar-------------------------

const handleAvatarSubmit = (inputValues) => {
  api.setAvatar(inputValues['avatar-link'])
  .then((res)=>{
    console.log(res);
      userInfo.setAvatar(res.avatar);
    }
  );
}

const popupAvatar = new PopupWithForm (
  '.popup_type_avatar',
  handleAvatarSubmit
);
popupAvatar.setEventListeners();
//===================================================================

//-----------------AddPlace-------------------------




const createCard = (item) =>{
  const card = new Card(
    item,
    '.template-element',
    handleCardClick,
    userId,
    api,
    handleCardDelete
  );

  return card.generateCard();
}

const placeSectionRenderer = (item) => {
  const place = createCard(item);
  placeList.addItem (place);
}

const handleAddPlaceSubmit = (inputValues, popup) => {
  popup.querySelector('.popup__submit-btn').textContent = 'Сохранение...';
  popup.querySelector('.popup__submit-btn').setAttribute('disabled','');
  api.setCard(inputValues['picture-caption'], inputValues['picture-link'])
    .then((newCard) => {
          placeSectionRenderer(newCard);
            popupAddPlace.close();
            popup.addEventListener('transitionend', ()=>{
              popup.querySelector('.popup__submit-btn').textContent = 'Сохранить';
              popup.querySelector('.popup__submit-btn').removeAttribute('disabled','');
            })
      }
    )
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

const placeList = new Section (placeSectionRenderer, '.elements');


api.getInitCardsAndUserInfo()
  .then(([ receivedCards, userInfo ]) => {
      userId = userInfo._id;
      placeList.renderItems(receivedCards);
    }
  )


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

avatar.addEventListener (
  'click',
  () => {
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



// api.getHarryPotter()
//   .then ((res) =>{

//       // res.forEach((item) => {
//       //   console.log(item.name);
//       // });
//       for (let i = 0; i < 30; i++) {
//         console.log(res[i].name);
//         console.log(res[i].image);
//         api.setCard(res[i].name, res[i].image).catch(err => console.log(err));
//       }
//     }
//   )
//   .then({})
//   .catch((err) =>{
//       console.log(err);
//     }
//   );

// api.setCard(
//   'котик',
//   'https://klike.net/uploads/posts/2018-10/1539499416_1.jpg'
// )
// .catch(err => console.log(err));

// api.getCard()
//   .then ((res) =>{
//       res.cards.forEach((item) => {
//         api.setCard(`${item.value} ${item.suit}`, item.image).catch(err => console.log(err));
//       });
//     }
//   )
//   .then({})
//   .catch((err) =>{
//       console.log(err);
//     }
//   );
// api.setCard(
//   'котик',
//   'https://klike.net/uploads/posts/2018-10/1539499416_1.jpg'
// )
// .catch(err => console.log(err));
