const validationConfig = {
  formSelector: '.popup__form',                                     //'.popup__form',
  inputSelector: '.popup__input',                                   //'.popup__input',
  submitButtonSelector: '.popup__submit-btn',                       //'.popup__button',
  inactiveButtonClass: 'popup__submit-btn_disable',                 //'popup__button_disabled',
  inputErrorClass: 'popup__input_error',                            //'popup__input_type_error',
  errorClass: 'popup__error_active'                                 //'popup__error_visible'
}
//---------------------- decorate inputs elements on validity state
const decorateInputCorrect = (inputErrorClass, input) => {
  input.classList.remove(inputErrorClass);
}
const decorateInputError = (inputErrorClass, input) => {
  input.classList.add(inputErrorClass);
}
//---------------------- ON|OFF Error message under input element
const showError = (errorClass, errorElement) => {
  errorElement.classList.add(errorClass);
}
const hideError = (errorClass,errorElement) => {
  errorElement.classList.remove( errorClass);
}
//---------------------- set Error Message
const setErrorMessage = (errorElement, message) => {
    errorElement.textContent = message;
}
//---------------------- set input decoration and error element message on|off
const setInputStateValidity = (validationConfig, form, input) =>  {
  const error = form.querySelector(`.popup__error_type_${input.id}`);
  if (input.validity.valid) {
      decorateInputCorrect(validationConfig.inputErrorClass, input);
      hideError(validationConfig.errorClass, error);
      setErrorMessage (error, '');
  }
  else {
      decorateInputError(validationConfig.inputErrorClass, input);
      showError(validationConfig.errorClass, error);
      setErrorMessage (error, input.validationMessage);
  }
};
//---------------------- do we have false input validity
const existInvalidInput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  })
};
//---------------------- make bttn enable
const enableSubmitBttn = (inactiveButtonClass, bttn) => {
  bttn.classList.remove(inactiveButtonClass);
  bttn.removeAttribute('disabled','');
}
//---------------------- make bttn disable
const disableSubmitBttn = (inactiveButtonClass, bttn) => {
  bttn.classList.add(inactiveButtonClass);
  bttn.setAttribute('disabled','');
}
//---------------------- set enable|disable submit button
const toggleBttnValidity = (validationConfig, formInputs, form) => {
  const bttn = form.querySelector(validationConfig.submitButtonSelector);
  if (existInvalidInput(formInputs)) {
    disableSubmitBttn(validationConfig.inactiveButtonClass, bttn);
  } else {
    enableSubmitBttn(validationConfig.inactiveButtonClass, bttn);
  }
};
//---------------------- one form validation
const setFormInputsListener = (validationConfig, popupForm) => {
  const formInputs = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  toggleBttnValidity(validationConfig, formInputs, popupForm);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      setInputStateValidity(validationConfig, popupForm, input);
      toggleBttnValidity(validationConfig, formInputs, popupForm);
    });
  });
};



//---------------------- set validation for all forms
const enableValidation = (validationConfig) => {
  const popupForms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  popupForms.forEach((popupForm) => {
    setFormInputsListener(validationConfig, popupForm);
  });
}

enableValidation(validationConfig);
