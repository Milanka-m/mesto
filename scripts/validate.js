const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-input-type-error',
  errorClass: 'popup__form-input-error_active'
};
// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  // находим элемент ошибки по уникальному классу поля ввода, к которому она относится 
  // находим элемент ошибки с применением шаблонных строк (id поля + class спэна)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // добавляем полю класс подсветки валидации
  inputElement.classList.add(inputErrorClass);
  // заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // показываем сообщение об ошибке
  errorElement.classList.add(errorClass);
};

// функция которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  // находим элемент ошибки по уникальному классу поля ввода, к которому она относится 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  // очистим ошибку
  errorElement.textContent = '';
};

// функция которая изменяет текст сообщения об ошибке используя свойства объекта validity
const getErrorMessage = (inputElement) => {
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

  const inputName = inputElement.name;
  const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;

  return errorHandler(inputElement);
};

// функция которая проверяет валидность поля и показывает или скрывает ошибку
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    const errorMessage = getErrorMessage(inputElement);
	// если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage);
  } else {
	// если проходит скроем 
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// функция проверяет есть ли невалидные данные с помощью объекта validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция, которая диактивирует кнопку сабмита если поле не валидно и наоборот 
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// слушатель событий добавим всем полям ввода внутри формы
// функция принимает параметром элемент формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // находим все поля внутри формы
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // находим кнопку сабмита формы
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале при загрузке страницы, 
  // вызываем функцию и передаем аргументами - массив полей и элементы кнопки
  // тогда кнопка перестанет быть активной до ввода данных в одно из полей  
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // обойдем все элементы полученной коллекции 
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input, который проверяет валидность поля
     inputElement.addEventListener('input', function () {
     // внутри колбэка вызовим функцию которая проверяет валидность поля на каждый ввод символа
       // передав ей форму и проверяемый элемент и элементы ошибок
       checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
       // такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей
       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
     });
   });
 };


// функция валидации всех форм которая находит и перебирает все формы в DOM (на странице)
const enableValidation = ({
  formSelector, 
  inputSelector, 
  submitButtonSelector, 
  inactiveButtonClass, 
  inputErrorClass,
  errorClass 
}) => {
	// находим массив всех элементов с классом form 
  const formList = Array.from(document.querySelectorAll(formSelector));
  // передаем массиву обработчик с параметром formElement
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};


// включение валидации вызовом enableValidation
// все настройки передаются при вызове в качестве аргументов

enableValidation(validationConfig); 

 
