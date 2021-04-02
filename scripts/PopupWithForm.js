import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ formSubmitHandler }, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formEl = this._popup.querySelector('.popup__form');
  }

  // приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    const inputElList = Array.from(this._formEl.querySelectorAll('.popup__form-input'));
    const inputElement = inputElList.map( (inputEl) => {
      return inputEl.value;
    });
    return inputElement;
  }
 
  // публичный метод закрытия попапа и сброса полей формы
  close() {
    this._formEl.reset();
    super.close();
  }

  // публичный метод, который добавляет слушатели клика и сабмита формы
  setEventListeners() {
    this._getInputValues();
    this._formEl.addEventListener('submit', this._formSubmitHandler);
    super.setEventListeners();
  }

}