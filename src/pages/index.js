import '../pages/index.css';
import { validationConfig,
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

const api = new Api({
  initUrlApi: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '5852ae18-3c59-4495-8516-a5afb3a9d703',
    'Content-Type': 'application/json'
  }
});

//-----------------Zooming Cards (Image Popup)------------------------

const imagePopup = new PopupWithImage (
  '.popup_type_picture'
);
imagePopup.setEventListeners();
//===================================================================

//-----------------Profile-------------------------
const userInfo = new UserInfo ({
    userNameSelector: '.profile__name',
    userOccupationSelector:'.profile__occupation'
  }
);
api.getUserInfo()
  .then((userInfoServer)=>{
    userInfo.setUserInfo(userInfoServer.name, userInfoServer.about);
  });


const handleProfileSubmit = (inputValues) => {
  api.setUserInfo(inputValues['profile-name'], inputValues['profile-occupation'])
    .then((userInfoServer) =>{
      userInfo.setUserInfo(userInfoServer.name, userInfoServer.about);
      popupProfile.close();
      }
    )
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


let userId = null;

const createCard = (item) =>{
  const card = new Card(
    item,
    '.template-element',
    handleCardClick,
    userId,
    api
  );
  return card.generateCard();
}

const placeSectionRenderer = (item) => {
  const place = createCard(item);
  placeList.addItem (place);
}


const placeList = new Section (placeSectionRenderer, '.elements');


api.getInitCardsAndUserInfo()
  .then(([ receivedCards, userInfo ]) => {
      userId = userInfo._id;
      console.log(receivedCards);
      placeList.renderItems(receivedCards);
    }
  )

console.log((1===2));
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
