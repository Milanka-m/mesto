// Находим форму profile
const formElement = document.querySelector('.popup__form');
// Находим из формы значения полей
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#about');
// Выбираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Находим попап profile, кнопки редактирования профиля и закрытия попапа
const popupProfile = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-edit');
// Находим из попапа profile кнопку "Закрыть попап" 
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close');

// Находим попап картинки и его элементы
const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-image');
const popupImageIllustratoin = popupImage.querySelector('.popup-image__illustration');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
// Находим форму card
const formElementCard = document.querySelector('.popup__form-add-cards');
// Находим из формы card значение полей
const nameInputCard = formElementCard.querySelector('#namecard');
const linkInputCard = formElementCard.querySelector('#linkcard');
// Находим попап card, кнопки добавления карточки и закрытия попапа
const popupCard = document.querySelector('.popup-add-cards');
const popupOpenButtonCard = document.querySelector('.profile__button-add');
const popupCloseButtonCard = popupCard.querySelector('.popup__close-add-cards');


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

//функция открытия попапа profile и card
function openPopup(popupEl) {
  // Передаем данные из профеля в поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  // Добавляем класс (видимость попапа)
  popupEl.classList.toggle('popup_opened');
}

//функция закрытия попапа profile и card
function closePopup(element) {
  element.classList.toggle('popup_opened');
} 

// функция обработчик «отправки» формы profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)                                       
  // Вставили новые значения полей с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // Вызываем функцию закрытия попапа
  closePopup(popupProfile);
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
  const newImageItem = newItem.querySelector('.elements__card-image');
  newImageItem.src = item.link;
  const newNameItem = newItem.querySelector('.elements__heading');
  newNameItem.textContent = item.name;
  // Находим кнопку "Удалить карточку"
  const cardDeleteButton = newItem.querySelector('.elements__icon-delete');
  //прикрепляем обработчик по клику на кнопку "Удалить карточку"
  cardDeleteButton.addEventListener('click', cardDelete);
  // находим кнопку "Поставить лайк"
  const iconFavoriteButton = newItem.querySelector('.elements__icon-favorite');
  // прикрепляем обработчик по клику на кнопку "Поставить лайк"
  iconFavoriteButton.addEventListener('click', cardFavorite);
  // вешаем обработчик на клик по картинке
  const popupOpenButtonImage = newItem.querySelector('.elements__card-link');
  popupOpenButtonImage.addEventListener('click', togglePopupImage);
  return newItem;
}

// функция обработчик «отправки» формы card (добавление карточки)
function formSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // передаем значение полей через форму
  const inputNameCard = nameInputCard.value;
  const inputLinkCard = linkInputCard.value;
  // передаем функции template контейнера в качестве аргумента объекты со значениями полученными из полей формы
  const cardElement = getItem({link: inputLinkCard, name: inputNameCard});
  // передаем в начало блока elements новые карточки
  elementsCards.prepend(cardElement);
  // очищаем поля формы
  nameInputCard.value = '';
  linkInputCard.value = '';
  // Вызываем функцию закрытия попапа
  closePopup(popupCard);
}

// функция удаления карточки
function cardDelete(evt) {
  const targetEl = evt.target; 
  const targetItem = targetEl.closest('.elements__card'); // метод closest находит блежайшего родителя
  targetItem.remove();
}

// функция лайка карточки
function cardFavorite(evt) {
  evt.target.classList.toggle('elements__icon-favorite_active');
}

// функция открытия попапа с картинкой
function togglePopupImage(evt) {
  const targetElement = evt.target; 
  const targetItemElement = targetElement.closest('.elements__card');
  popupImageIllustratoin.src = targetItemElement.querySelector('.elements__card-image').src;
  popupImageCaption.textContent = targetItemElement.querySelector('.elements__heading').textContent;
  popupImage.classList.toggle('popup-image_opened');
}

//функция закрытия попапа c картинкой по клику на крестик
function closePopupImage(evt) {
  if (evt.target === evt.currentTarget) {
    // Удаляем класс (видимость попапа)
    popupImage.classList.toggle('popup-image_opened');
  }
} 

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitAddCard);

//прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
popupOpenButton.addEventListener('click', () => {openPopup(popupProfile)});

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', () => {openPopup(popupCard)});

//прикрепляем обработчик по клику на кнопку "Закрыть попап"
popupCloseButtonProfile.addEventListener('click', () => {closePopup(popupProfile)});
popupCloseButtonCard.addEventListener('click', () => {closePopup(popupCard)});
popupCloseButtonImage.addEventListener('click', closePopupImage);



