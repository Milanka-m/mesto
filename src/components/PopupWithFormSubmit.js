import Popup from "./Popup.js";
export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._formEl = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback(this);
    });
    super.setEventListeners();
  }
}