export class FormValidator {
  constructor (validationConfig, popupForm){
    this._popupForm = popupForm;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  enableValidation(){
    this._setFormInputsListener();
  }



  _setFormInputsListener(){
    const formInputs = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    const submitBttn = this._popupForm.querySelector(this._submitButtonSelector);
    this._toggleBttnValidity(formInputs, submitBttn);
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(this._popupForm, input);
        this._toggleBttnValidity(formInputs, submitBttn);
      });
    });
  }

  _toggleBttnValidity(formInputs, submitBttn){
    if (this._existInvalidInput(formInputs)) {
      this.disableSubmitBttn(submitBttn);
    }
    else {
      this.enableSubmitBttn(submitBttn);
    }
  }

  _existInvalidInput(formInputs){
    return formInputs.some((input) => {
      return !input.validity.valid;
    })
  }

  enableSubmitBttn (submitBttn) {
    submitBttn.classList.remove(this._inactiveButtonClass);
    submitBttn.removeAttribute('disabled','');
  }

  disableSubmitBttn (submitBttn){
    submitBttn.classList.add(this._inactiveButtonClass);
    submitBttn.setAttribute('disabled','');
  }

  _isValid(form, input){
    if (input.validity.valid) {
        this._hideInputError(form, input);
    }
    else {
        this._showInputError(form, input, input.validationMessage);
    }
  }

  _hideInputError(form, input){
    const errorElement = this._getErrorElement (form, input);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(form, input, errorMessage){
    const errorElement = this._getErrorElement (form, input);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _getErrorElement(form, input){
    return form.querySelector(`.popup__error_type_${input.id}`);
  }

  clearError(form){
    const formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    formInputs.forEach((input) => {
      this._hideInputError(form, input);
    });
  }
}
