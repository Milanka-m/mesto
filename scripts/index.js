// Находим попап profile, кнопки редактирования профиля и закрытия попапа
const popupProfile = '.popup-profile';
const popupOpenButtonProfile = document.querySelector('.profile__button-edit');

// Находим форму profile
const profileForm = document.forms.profile;
// Находим из формы значения полей
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.about;

// Выбираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Находим попап card, кнопки добавления карточки и закрытия попапа
const popupCard = '.popup-add-cards';
const popupOpenButtonCard = document.querySelector('.profile__button-add');

// Находим форму card
const formElementCard = document.forms.card;
// Находим из формы card значение полей
const nameInputCard = formElementCard.elements.namecard;
const linkInputCard = formElementCard.elements.linkcard;

// Находим блок для вставки карточек
const elementsCards = '.elements';

// Находим попап картинки и его элементы
const popupImage = '.popup-image';

const popupImageIllustratoin = document.querySelector('.popup-image__illustration');
const popupImageCaption = document.querySelector('.popup-image__caption');

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

import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js"
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";


// функция создания новой карточки
const createCard = (item) => {
  const card = new Card(item, '.template', handleCardClick);
  const htmlCard = card.generateCard();
  return htmlCard;
}

// создаем экземпляр класса Section, передаем первым параметром массив карточек
// и функцию-колбэк renderer которая получает разметку карточки и вставляет её в контейнер
const cardsList = new Section({ items: initialCards, renderer: (item) => {
    const cardElement = createCard(item);
    // вставляем полученный элемент в разметку
    cardsList.addItem(cardElement);} }, elementsCards);

    cardsList.renderItems();

// создаем экземпляры класса FormValidator
const formProfile = new FormValidator(validationConfig, profileForm);
formProfile.enableValidation();
const formCard = new FormValidator(validationConfig, formElementCard);
formCard.enableValidation();

// создаем экземпляры класса PopupWithImage
const imagePopup = new PopupWithImage(popupImage);

// функция открытия попапа с картинкой
function handleCardClick(link, name) {
  imagePopup.open(link, name);
  imagePopup.setEventListeners();
}

// создаем экземпляр класса UserInfo
const userInfo = new UserInfo({ nameSelector: profileTitle, aboutSelector: profileSubtitle });

// создаем экземпляр класса PopupWithForm
const profilePopup = new PopupWithForm({ formSubmitHandler: (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput, jobInput);
  profilePopup.close();
  
} }, popupProfile);

// создаем экземпляр класса PopupWithForm
const cardPopup = new PopupWithForm({ formSubmitHandler: (evt) => {
  evt.preventDefault();
  const inputNameCard = nameInputCard.value;
  const inputLinkCard = linkInputCard.value;
  const newCard = {
    link: inputLinkCard,
    name: inputNameCard
  }
  const cardImage = createCard(newCard);
  const containerElements = document.querySelector(elementsCards);
  containerElements.prepend(cardImage);
  cardPopup.close();
} }, popupCard);


// прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
// передаем в качестве аргумента колбек функцию передачи данных из профеля в поля формы при открытии попапа profile
popupOpenButtonProfile.addEventListener('click', () => { 
  // вызываем публичный метод очистки полей от ошибки
  formProfile.clearError();
  // вставляем значение полей из блока профайл
  userInfo.getUserInfo(nameInput, jobInput);
  profilePopup.open();
});

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', () => {
  // вызываем публичный метод очистки полей от ошибки
  formCard.clearError();
  cardPopup.open();
});

// вызываем публичный метод закрытия попапа по иконке и сабмита формы
profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();