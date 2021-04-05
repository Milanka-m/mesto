import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // перезаписываем метод open родительского класса
  open(link, name) {
    super.open();
    this._popup.querySelector('.popup-image__illustration').src = link;
    this._popup.querySelector('.popup-image__caption').textContent = name;
  }
}