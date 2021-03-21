export default class formValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement; 
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  // приватный метод, который добавляет класс с ошибкой
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage; 
    this._errorElement.classList.add(this._errorClass);
  }

  // приватный метод удаления класса с ошибкой
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  // приватный метод, который меняет текст сообщения об ошибке используя свойства объекта validity
  _getErrorMessage() {
    const defaultErrorHandler = (inputElement) => inputElement.validationMessage; 
    const urlErrorHandler = (inputElement) => {
      if (inputElement.validity.typeMismatch) {
        return "Введите адрес сайта.";
      }
      if (inputElement.validity.valueMissing) {
        return "Вы пропустили это поле.";
      }
    };
    const nameErrorHandler = (inputElement) => {
      if (inputElement.validity.tooShort) {
        return inputElement.validationMessage;
      }
      if (inputElement.validity.tooLong) {
        return inputElement.validationMessage;
      }
      if (inputElement.validity.valueMissing) {
        return "Вы пропустили это поле.";
      }
    };
    const errorHandlers = {
      linkcard: urlErrorHandler,
      namecard: nameErrorHandler,
      name: nameErrorHandler,
      about: nameErrorHandler,
      DEFAULT: defaultErrorHandler
    };

    const inputName = this._inputElement.name;
    const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;

    return errorHandler(this._inputElement);
  }

  // приватный метод, проверяет валидность поля и показывает или скрывает ошибку
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) { 
    // если поле не проходит валидацию, покажем ошибку 
      this._showInputError(inputElement, inputElement.validationMessage); 
    } else { 
    // если проходит скроем  
      this._hideInputError(inputElement); 
    } 
  }

  // приватный метод проверяет есть ли невалидные данные с помощью объекта validity 
  _hasInvalidInput() { 
    return this._inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }); 
  } 

  //функция, которая диактивирует кнопку сабмита если поле не валидно и наоборот  
  _toggleButtonState() { 
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid; 
    const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid); 
 
    if (hasNotValidInput) { 
      this._buttonElement.setAttribute("disabled", true); 
      this._buttonElement.classList.add(this._inactiveButtonClass); 
    } else { 
      this._buttonElement.removeAttribute("disabled"); 
      this._buttonElement.classList.remove(this._inactiveButtonClass); 
    } 
  }

  // приватный метод, добавит слушатель событий всем полям ввода внутри формы 
  _setEventListeners() { 
    this._toggleButtonState(); 
    // обойдем все элементы полученной коллекции  
    this._inputList.forEach((inputElement) => { 
      // каждому полю добавим обработчик события input, который проверяет валидность поля 
      inputElement.addEventListener('input', () => { 
       // внутри колбэка вызовим функцию которая проверяет валидность поля на каждый ввод символа 
         // передав ей форму и проверяемый элемент и элементы ошибок 
         this._checkInputValidity(inputElement); 
         // такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей 
         this._toggleButtonState(); 
       }); 

       this._hideInputError(inputElement);
     }); 
   } 

   // публичный метод очистки полей форм от ошибки
  clearError() {
    this._inputList.forEach((inputElement) => {
      // скроем все ошибки при открытии попапа
      this._hideInputError(inputElement);
      });
      
    this._toggleButtonState();
  }

   // функция валидации всех форм которая находит и перебирает все формы в DOM (на странице) 
  enableValidation() { 
    this._setEventListeners(this._formElement, this._inputSelector, this._inactiveButtonClass, this._inputErrorClass, this._errorClass, this._formElement);
  }

}
