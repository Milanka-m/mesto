export default class Card {
  constructor({ data, handleDeleteButtonClick, handleLikeButtonClick, handleDislikeButtonClick }, myId, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes;
    this._id = data._id;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDislikeButtonClick = handleDislikeButtonClick;
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

  _getElement() {

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
    this._favoriteEl.classList.add('elements__icon-favorite_active');
  }

  _removeActiveLike() {
    this._favoriteEl.classList.remove('elements__icon-favorite_active');
  }

  // метод возвращает количество лайков
  _cardLikeNumber() {
    this._likeNumber.textContent = this._likesCount.length;
  }

  // метод проверяет есть ли мой лайк в массиве лайков
  _isMyLike() {
    return Boolean(this._likesCount.find(el => el._id === this._myId));
  }
  
  _updateLikesView() {
    if(this._isMyLike()) {
      this._addActiveLike();
      this._cardLikeNumber();
    } else {
      this._removeActiveLike();
      this._cardLikeNumber();
    }
  } 

  updateLikes(data) {
    this._likesCount = data.likes;
    this._updateLikesView();
  } 
 
  // приватный метод обработки событий
  _setEventListeners() {
    this._element.querySelector('.elements__card-link').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector('.elements__icon-delete').addEventListener('click', () => {
        this._handleDeleteButtonClick(this);
    });

    this._favoriteEl.addEventListener('click', () => {
      if(this._isMyLike()) {
        this._handleDislikeButtonClick(this);
      } else {
        this._handleLikeButtonClick(this);
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
    this._likeNumber = this._element.querySelector('.elements__like-number');
    this._favoriteEl = this._element.querySelector('.elements__icon-favorite');
    this._setEventListeners();
    this._imageCardEl = this._element.querySelector('.elements__card-image');
    this._imageCardEl.src = this._link;
    this._imageCardEl.alt = this._name;
    this._element.querySelector('.elements__heading').textContent = this._name;
    this._updateLikesView();
    this._cardLikeNumber();
    
    return this._element;
  }

}
