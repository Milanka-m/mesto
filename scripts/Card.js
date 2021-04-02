export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector('.elements__icon-delete').addEventListener('click', () => {
      this._cardDelete();
    });

    this._element.querySelector('.elements__icon-favorite').addEventListener('click', () => {
      this._cardFavorite();
    });

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
