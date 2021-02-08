// Находим форму profile
const formElement = document.querySelector('.popup__form');
// Находим из формы значения полей
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#about');
// Выбираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Находим попап profile, кнопки редактирования профиля и закрытия попапа
const overlay = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = overlay.querySelector('.popup__close');

// Находим форму card
const formElementCard = document.querySelector('.popup-add-cards__form');
// Находим из формы card значение полей
const nameInputCard = formElementCard.querySelector('#namecard');
const linkInputCard = formElementCard.querySelector('#linkcard');
// Находим попап card, кнопки добавления карточки и закрытия попапа
const popupCard = document.querySelector('.popup-add-cards');
const popupOpenButtonCard = document.querySelector('.profile__button-add');
const popupCloseButtonCard = popupCard.querySelector('.popup-add-cards__close');

// Находим блок для вставки карточек
const elementsCards = document.querySelector('.elements');
// Находим template элемент
const templateElement = document.querySelector('.template');

// массив из 6-ти карточек которые должны отобразится на странице при загрузке
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция открытия попапа profile
function togglePopup() {
  // Передаем данные из профеля в поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  // Добавляем класс (видимость попапа)
  overlay.classList.toggle('popup_opened');
}

//функция закрытия попапа profile по оверлоу
function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    //В момент закрытия модального окна полям ничего не передается
    // Удаляем класс (видимость попапа)
    overlay.classList.toggle('popup_opened');
  }
} 

// функция обработчик «отправки» формы profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)
                                             
  // Вставили новые значения полей с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // Вызываем функцию закрытия попапа
  closePopup(evt);
}

// функция рендера карточек на странице
function renderCards() {
  const htmlCards = initialCards.map(getItem);
  elementsCards.append(...htmlCards);
}

// вызов функции
renderCards();

// функция клонирования контента template контейнера
function getItem(item) {
  const newItem = templateElement.content.cloneNode(true);
  newItem.querySelector('.elements__card-image').src = item.link;
  newItem.querySelector('.elements__heading').textContent = item.name;

  // Находим кнопку "Удалить карточку"
  const cardDeleteButton = newItem.querySelector('.elements__icon-delete');
  //прикрепляем обработчик по клику на кнопку "Удалить карточку"
  cardDeleteButton.addEventListener('click', cardDelete);

  // находим кнопку "Поставить лайк"
  const iconFavoriteButton = newItem.querySelector('.elements__icon-favorite');
  // прикрепляем обработчик по клику на кнопку "Поставить лайк"
  iconFavoriteButton.addEventListener('click', cardFavorite);

  return newItem;
}

//функция открытия попапа card
function togglePopupCard() {
  // Добавляем класс (видимость попапа)
  popupCard.classList.toggle('popup-add-cards_opened');
}

//функция закрытия попапа card по клику на крестик
function closePopupCard(evt) {
  if (evt.target === evt.currentTarget) {
    // Удаляем класс (видимость попапа)
    popupCard.classList.toggle('popup-add-cards_opened');
  }
} 

// функция обработчик «отправки» формы card (добавление карточки)
function formSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // передаем значение полей через форму
  const inputNameCard = nameInputCard.value;
  const inputLinkCard = linkInputCard.value;
  // передаем функции template контейнера в качестве аргумента объекты со значениями полученными из полей формы
  const cardElement = getItem({link: inputLinkCard, name: inputNameCard});
  console.log(cardElement);
  // передаем в начало блока elements новые карточки
  elementsCards.prepend(cardElement);
  // очищаем поля формы
  nameInputCard.value = '';
  linkInputCard.value = '';
  // Вызываем функцию закрытия попапа
  closePopupCard(evt);
}

// функция удаления карточки
function cardDelete(evt) {
  const targetEl = evt.target;
  const targetItem = targetEl.closest('.elements__card');
  targetItem.remove();
}

// функция лайка карточки
function cardFavorite(evt) {
  evt.target.classList.toggle('elements__icon-favorite_active');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitAddCard);

//прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
popupOpenButton.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', togglePopupCard);

//прикрепляем обработчик по клику на кнопку "Закрыть попап"
popupCloseButton.addEventListener('click', closePopup);
popupCloseButtonCard.addEventListener('click', closePopupCard);

//прикрепляем обработчик по клику на оверлоу
overlay.addEventListener('mousedown', closePopup);
