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

// функция добавления карточек на страницу
function renderCards() {
  const htmlCards = initialCards.map(getItem);
  elementsCards.append(...htmlCards);
}

// функция клонирования контента template контейнера
function getItem(item) {
  const newItem = templateElement.content.cloneNode(true);
  newItem.querySelector('.elements__card-image').src = item.link;
  newItem.querySelector('.elements__heading').textContent = item.name;
  return newItem;
}
// вызов функции
renderCards();

//функция открытия попапа
function togglePopup() {
  // Передаем данные из профеля в поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  // Добавляем класс (видимость попапа)
  overlay.classList.toggle('popup_opened');
  popupCard.classList.toggle('popup-add-cards_opened');
}

//функция закрытия попапа по оверлоу
function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    //В момент закрытия модального окна полям ничего не передается
    // Удаляем класс (видимость попапа)
    overlay.classList.toggle('popup_opened');
    popupCard.classList.toggle('popup-add-cards_opened');
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

// функция обработчик «отправки» формы card
function formSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // повторно клонируем template контейнер и присвоим его элементам полученные из формы значения полей
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector('.elements__card-image').src = linkInputCard.value;
  newCard.querySelector('.elements__heading').textContent = nameInputCard.value;
  // Вызываем функцию закрытия попапа
  closePopup(evt);
  // фунция возвращает вставку значений полей в начало блока elements
  return elementsCards.prepend(newCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitAddCard);

//прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
popupOpenButton.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на кнопку "Закрыть попап"
popupCloseButton.addEventListener('click', closePopup);
popupCloseButtonCard.addEventListener('click', closePopup);

//прикрепляем обработчик по клику на оверлоу
overlay.addEventListener('mousedown', closePopup);