export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closeOnKeyEscape);
}

//======================== close popup window
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closeOnKeyEscape);
}

const closeOnKeyEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
}
