import './index.css'; // добавили импорт главного файла стилей 

import { popupProfile, 
  popupOpenButtonProfile, 
  profileForm, 
  nameInput, 
  jobInput, 
  profileTitle, 
  profileSubtitle, 
  popupCard, 
  popupOpenButtonCard, 
  formElementCard, 
  nameInputCard, 
  linkInputCard, 
  elementsCards, 
  popupImage, 
  initialCards, 
  validationConfig } from "../utils/constants.js";
  
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

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