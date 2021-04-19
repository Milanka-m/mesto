import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._illustration = this._popup.querySelector('.popup-image__illustration');
    this._caption = this._popup.querySelector('.popup-image__caption');
  }

  // перезаписываем метод open родительского класса
  open(link, name) {
    super.open();
    this._illustration.src = link;
    this._illustration.alt = name;
    this._caption.textContent = name;
  }
}