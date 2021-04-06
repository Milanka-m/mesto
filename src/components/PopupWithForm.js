import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formEl = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formEl.querySelectorAll('.popup__form-input'));
  }

  // приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
 
  // публичный метод закрытия попапа и сброса полей формы
  close() {
    this._formEl.reset();
    super.close();
  }

  // публичный метод, который добавляет слушатели клика и сабмита формы
  setEventListeners() {
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

}