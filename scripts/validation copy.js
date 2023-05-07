const validationConfig = {
  formSelector: '.popup__form',                                     //'.popup__form',
  inputSelector: '.popup__input',                                   //'.popup__input',
  submitButtonSelector: '.popup__submit-btn',                       //'.popup__button',
  inactiveButtonClass: 'popup__submit-btn_disable',                 //'popup__button_disabled',
  inputErrorClass: 'popup__input_error',                            //'popup__input_type_error',
  errorClass: 'popup__error_active'                                 //'popup__error_visible'
}

const getErrorElement = (form, input) => {
  return form.querySelector(`.popup__error_type_${input.id}`);
}
//---------------------- set input decoration and error element message on|off

const hideInputError = (form, input, validationConfig) => {
  const errorElement = getErrorElement (form, input);
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const showInputError = (form, input, errorMessage, validationConfig) => {
  const errorElement = getErrorElement (form, input);
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const isValid = (validationConfig, form, input) => {
  if (input.validity.valid) {
      hideInputError(form, input, validationConfig);
  }
  else {
      showInputError(form, input, input.validationMessage, validationConfig);
  }
};
//---------------------- do we have false input validity
const existInvalidInput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  })
};
//---------------------- make bttn enable
const enableSubmitBttn = (inactiveButtonClass, submitBttn) => {
  submitBttn.classList.remove(inactiveButtonClass);
  submitBttn.removeAttribute('disabled','');
}
//---------------------- make bttn disable
const disableSubmitBttn = (inactiveButtonClass, submitBttn) => {
  submitBttn.classList.add(inactiveButtonClass);
  submitBttn.setAttribute('disabled','');
}
//---------------------- set enable|disable submit button
const toggleBttnValidity = (validationConfig, formInputs, submitBttn) => {
  if (existInvalidInput(formInputs)) {
    disableSubmitBttn(validationConfig.inactiveButtonClass, submitBttn);
  } else {
    enableSubmitBttn(validationConfig.inactiveButtonClass, submitBttn);
  }
};
//---------------------- one form validation
const setFormInputsListener = (validationConfig, popupForm) => {
  const formInputs = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  const submitBttn = popupForm.querySelector(validationConfig.submitButtonSelector);
  toggleBttnValidity(validationConfig, formInputs, submitBttn);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(validationConfig, popupForm, input);
      toggleBttnValidity(validationConfig, formInputs, submitBttn);
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
