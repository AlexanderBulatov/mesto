let popupInputName = document.querySelector('.popup-edit-profile__input_type_name');
let popupInputOccupation = document.querySelector('.popup-edit-profile__input_type_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
// open popup window
function openPopupProfile (){
  document.querySelector('.body__popup').classList.add('popup_open');
  document.querySelector('.body__content').classList.add('page_scroll-off');
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
}
// close popup window
function closePopupProfile (){
  document.querySelector('.body__popup').classList.remove('popup_open');
  document.querySelector('.body__content').classList.remove('page_scroll-off');
}
// submit and close popup window if inputs isn't equal ''
function handleFormSubmit (e) {
    e.preventDefault();

    if(popupInputName.value !=='' && popupInputOccupation.value !==''){
      profileName.textContent = popupInputName.value;
      profileOccupation.textContent = popupInputOccupation.value;
      closePopupProfile();
    }
}
// add listeners to editing profile and popup btn-s
document.querySelector('.profile__edit').addEventListener('click',openPopupProfile);
document.querySelector('.popup__close').addEventListener('click',closePopupProfile);
document.querySelector('.popup__form').addEventListener('submit', handleFormSubmit);
