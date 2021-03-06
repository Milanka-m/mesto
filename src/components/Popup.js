export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // привязали функцию к контексту this в конструкторе 1 раз с помощью bind
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }
  
  // публичный метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  // публичный метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  }

  // приватный метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    // если нажата кнопка Esc 
    if (evt.key === "Escape") {
      // закрываем открытый попап
      this.close();
    }
  }

  // приватный метод, который содержит логику закрытия попапа по оверлэю
  _handleOverlayClose(evt) {
    // если кликнули в любом месте вне попапа
    if (evt.target === evt.currentTarget) {
      // закрываем открытый попап
      this.close();
    }
  }

  // публичный метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
  }
}