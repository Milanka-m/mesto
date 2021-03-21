// Находим попап картинки и его элементы
const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup-image-close');
const popupImageIllustratoin = popupImage.querySelector('.popup-image__illustration');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  // приватный метод клонирования template контейнера
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__card')
    .cloneNode(true);

    return cardElement;
  }

  // приватный метод открытия попапа с картинкой
  _handleOpenPopup() {
    popupImageIllustratoin.src = this._link;
    popupImageCaption.textContent = this._name;
    popupImage.classList.add('popup_opened');
  }

  // приватный метод закрытия попапа с картинкой нажатием на крестик
  _handleClosePopup() {
    popupImageIllustratoin.src = '';
    popupImageCaption.textContent = '';
    popupImage.classList.remove('popup_opened');
  }

  // приватный метод закрытия попапа с картинкой нажатием на клавишу Esc
  _closePopupEsc(evt) {
    // если нажата кнопка Esc 
    if (evt.key === "Escape") {
      popupImageIllustratoin.src = '';
      popupImageCaption.textContent = '';
      popupImage.classList.remove('popup_opened');
   }
  }

  // приватный метод закрытия попапа с картинкой по оверлей
  _closePopupOverlay(evt) { 
    // если кликнули в любом месте вне попапа
    if (evt.target === evt.currentTarget) {
      popupImageIllustratoin.src = '';
      popupImageCaption.textContent = '';
      popupImage.classList.remove('popup_opened');
    }
  } 

  // приватный метод удаления карточки
  _cardDelete() {
    this._element.closest('.elements__card').remove();
  }

  // приватный метод лайка карточки
  _cardFavorite() {
    this._element.querySelector('.elements__icon-favorite').classList.toggle('elements__icon-favorite_active');
  }

  // приватный метод обработки событий
  _setEventListeners() {
    this._element.querySelector('.elements__card-link').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._element.querySelector('.elements__icon-delete').addEventListener('click', () => {
      this._cardDelete();
    });

    this._element.querySelector('.elements__icon-favorite').addEventListener('click', () => {
      this._cardFavorite();
    });
  
    popupCloseButtonImage.addEventListener('click', () => {
      this._handleClosePopup();
    });

    document.addEventListener('keydown', this._closePopupEsc);

    popupImage.addEventListener('mousedown', this._closePopupOverlay);
  } 
  
  // публичный метод создания карточки в соответсвии с разметкой template контейнера
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    // метод generateCard наполняет данными только ту разметку, которая нужна в шаблоне.
    this._element.querySelector('.elements__card-image').src = this._link;
    this._element.querySelector('.elements__card-image').alt = this._name;
    this._element.querySelector('.elements__heading').textContent = this._name;
  
    return this._element;
  }

}

export { popupImage, popupCloseButtonImage, popupImageIllustratoin, popupImageCaption, Card };
