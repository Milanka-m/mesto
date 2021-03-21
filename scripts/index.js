// Находим попап profile, кнопки редактирования профиля и закрытия попапа
const popupProfile = document.querySelector('.popup-profile');
const popupOpenButtonProfile = document.querySelector('.profile__button-edit');
// Находим из попапа profile кнопку "Закрыть попап" 
const popupCloseButtonProfile = popupProfile.querySelector('.popup-profile-close');
// Находим форму profile
const profileForm = document.forms.profile;
// Находим из формы значения полей
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.about;

// Выбираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Находим попап card, кнопки добавления карточки и закрытия попапа
const popupCard = document.querySelector('.popup-add-cards');
const popupOpenButtonCard = document.querySelector('.profile__button-add');
const popupCloseButtonCard = popupCard.querySelector('.popup-add-cards-close');

// Находим форму card
const formElementCard = document.forms.card;
// Находим из формы card значение полей
const nameInputCard = formElementCard.elements.namecard;
const linkInputCard = formElementCard.elements.linkcard;

// Находим блок для вставки карточек
const elementsCards = document.querySelector('.elements');


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

const validationConfig = { 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: '.popup__form-button', 
  inactiveButtonClass: 'popup__form-button_inactive', 
  inputErrorClass: 'popup__form-input-type-error', 
  errorClass: 'popup__form-input-error_active' 
}; 

import { popupImage, popupCloseButtonImage, popupImageIllustratoin, popupImageCaption, Card } from "./Card.js"
import formValidator from "./FormValidator.js";

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const htmlCards = card.generateCard();
  elementsCards.append(htmlCards);
}); 

const formProfile = new formValidator(validationConfig, profileForm);
formProfile.enableValidation();
const formCard = new formValidator(validationConfig, formElementCard);
formCard.enableValidation();

  //функция открытия попапа profile, card, image
function openPopup(popupEl) {
  // Добавляем класс (видимость попапа)
  popupEl.classList.add('popup_opened');
  // добавляем на страницу слушатель события нажатия на клавишу Esc, который вызывает закрытие попапа
  document.addEventListener('keydown', closePopupEsc);
  // добавляем на попап слушатель события нажатия на мышь
  popupEl.addEventListener('mousedown', closePopupOverlay);
  }

//функция закрытия попапа profile, card, image
function closePopup(element) {
  // Удаляем класс (видимость попапа)
  element.classList.remove('popup_opened');
  // удаляем слушатель нажатия клавиши на страницу, передаем функцию колбэк закрытия попапа нажатием клавиши Esc
  document.removeEventListener('keydown', closePopupEsc);
  // удаляем слушатель элементу попапа, передаем функцию колбэк закрытия попапа кликом вне попапа
  element.removeEventListener('mousedown', closePopupOverlay);
} 

//функция закрытия попапа нажатием клавиши Esc
function closePopupEsc(evt) {
  // если нажата кнопка Esc 
  if (evt.key === "Escape") {
    // находим открытый попап
    const popupOpened = document.querySelector('.popup_opened');
    // вызываем функцию закрытия попапа
    closePopup(popupOpened);
  }
}

//функция закрытия попапа по оверлей
//evt.target - это и есть наш открытый попап, так как он показывает элемент, на который был навешен обработчик
function closePopupOverlay(evt) { 
  // если кликнули в любом месте вне попапа
  if (evt.target === evt.currentTarget) {
    // закрываем открытый попап
    closePopup(evt.target); 
  }
} 

// функция обработчик «отправки» формы profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)                                       
  // Вставили новые значения полей с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // Вызываем функцию закрытия попапа (попап profile в качестве аргумента)
  closePopup(popupProfile);
} 

// функция обработчик «отправки» формы card (добавление карточки)
function formSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // передаем значение полей через форму
  const inputNameCard = nameInputCard.value;
  const inputLinkCard = linkInputCard.value;
  const cardElement = new Card({link: inputLinkCard, name: inputNameCard}, '.template');
  // передаем в начало блока elements новые карточки
  elementsCards.prepend(cardElement.generateCard());
  formElementCard.reset();
  // Вызываем функцию закрытия попапа
  closePopup(popupCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitAddCard);

// прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
// передаем в качестве аргумента колбек функцию передачи данных из профеля в поля формы при открытии попапа profile
popupOpenButtonProfile.addEventListener('click', () => { 
  // вызываем публичный метод очистки полей от ошибки
  formProfile.clearError();
  // вставляем значение полей из блока профайл
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', () => {
  // вызываем публичный метод очистки полей от ошибки
  formCard.clearError();
  // очищаем поля формы
  formElementCard.reset();
  openPopup(popupCard);
});
//прикрепляем обработчик по клику на кнопку "Закрыть попап" для троих попапов
popupCloseButtonProfile.addEventListener('click', () => {closePopup(popupProfile)});
popupCloseButtonCard.addEventListener('click', () => {closePopup(popupCard)});


