export default class Card {
  constructor({ data, handleDeleteButtonClick, nandleLikeButtonClick, nandleDislikeButtonClick }, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._myId = '91adc96fec2731ded62f009d';
    this._ownerId = data.owner._id;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._nandleLikeButtonClick = nandleLikeButtonClick;
    this._nandleDislikeButtonClick = nandleDislikeButtonClick;
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

  _getIconeRemove() {
    if(this._ownerId === this._myId) {
      this._element.querySelector('.elements__icon-delete').classList.add('elements__icon-delete_active');
    }
  }

  // публичный метод удаления карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // приватный метод лайка карточки
  _addActiveLike() {
    this._element.querySelector('.elements__icon-favorite').classList.add('elements__icon-favorite_active');
  }

  _removeActiveLike() {
    this._element.querySelector('.elements__icon-favorite').classList.remove('elements__icon-favorite_active');
  }

  // метод возвращает количество лайков
  _cardLikeNumber() {
    this._likeNumber.textContent = this._likes.length;
  }

  // метод проверяет есть ли мой лайк в массиве лайков
  _isMyLike() {
    return Boolean(this._likes.find(el => el._id === this._myId));
  }
  
  updateLikesVie(likeLenght) {
    if(this._isMyLike()) {
      this._addActiveLike();
      likeLenght += 1;
      this._cardLikeNumber();
    } else {
      this._removeActiveLike();
      likeLenght -= 1;
      this._cardLikeNumber();
    }
  } 

  updateLikes(data) {
    this._likes = data.likes;
    return this._likes.length;
  } 
 
  // приватный метод обработки событий
  _setEventListeners() {
    this._element.querySelector('.elements__card-link').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector('.elements__icon-delete').addEventListener('click', () => {
        this._handleDeleteButtonClick(this);
    });

    this._element.querySelector('.elements__icon-favorite').addEventListener('click', () => {
      if(this._isMyLike()) {
        this._nandleDislikeButtonClick(this);
      } else {
        this._nandleLikeButtonClick(this);
      }
    });
  } 

  getId() {
    return this._id;
  }

  // публичный метод создания карточки в соответсвии с разметкой template контейнера
  generateCard() {
    this._element = this._getTemplate();
    this._getIconeRemove();
    this._setEventListeners();
    // метод generateCard наполняет данными только ту разметку, которая нужна в шаблоне.
    this._element.querySelector('.elements__card-image').src = this._link;
    this._element.querySelector('.elements__card-image').alt = this._name;
    this._element.querySelector('.elements__heading').textContent = this._name;
    this._likeNumber = this._element.querySelector('.elements__like-number');
    this._cardLikeNumber();
   
    return this._element;
  }

}
