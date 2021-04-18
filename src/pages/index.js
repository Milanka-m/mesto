import './index.css'; // добавили импорт главного файла стилей 

import { popupProfile, 
  popupOpenButtonProfile, 
  profileForm, 
  nameInput, 
  jobInput, 
  profileAvatar,
  profileTitle, 
  profileSubtitle,
  profileEditButtonAvatar,
  popupAvatar,
  avatarForm, 
  popupCard, 
  popupOpenButtonCard, 
  formElementCard, 
  elementsCards, 
  popupImage,
  popupRemoveCards,
  cardSelector, 
  validationConfig } from "../utils/constants.js";

import { buttonLoadingSubmit } from "../utils/utils.js";
  
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithFormSubmit from "../components/PopupWithFormSubmit.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js"

const api = new Api({
  address: 'https://mesto.nomoreparties.co',
  token: '6db4154b-d992-4850-8211-1b620ba1fb44',
  groupID: 'cohort-22'
});

// функция создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data,
    handleDeleteButtonClick: () => {
      submitPopup.setSubmitAction(() => {
        api.removeCard(card.getId())
        .then(() => {
          card.removeCard();
        })
        .catch((err) => {
          console.log(err);
        })
      })
      submitPopup.open();
    },
    nandleLikeButtonClick: () => {
      api.addLikeCard(card.getId())
        .then((data) => {
          const likeLenght = card.updateLikes(data);
          card.updateLikesVie(likeLenght);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    nandleDislikeButtonClick: () => {
      api.removeLikeCard(card.getId())
      .then((data) => {
        const likeLenght = card.updateLikes(data);
        card.updateLikesVie(likeLenght);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, cardSelector, handleCardClick);

  return card.generateCard();
} 

// создаем экземпляр класса Section
// и функцию-колбэк renderer которая получает разметку карточки и вставляет её в контейнер
const cardsList = new Section({
    renderer: (data) => {
      const cardElement = createCard(data);
      // вставляем полученный элемент в разметку
      cardsList.addItem(cardElement);
    } 
  }, elementsCards);

// если ответ положительный, получаем с сервера карточки, которые появляются при загрузке страницы
api.getCards()
  .then((cards) => {
    console.log(cards);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

// создаем экземпляр класса PopupWithFormSubmit
const submitPopup = new PopupWithFormSubmit(popupRemoveCards, () => {
  card.removeCard();
});
submitPopup.setEventListeners();

// создаем экземпляр класса UserInfo
const userInfo = new UserInfo({ avatarSelector: profileAvatar, nameSelector: profileTitle, aboutSelector: profileSubtitle });
api.getUsers()
  .then((users) => {
    console.log(users);
    userInfo.setUserInfo(users);
    userInfo.setUserAvatar(users);
  })
  .catch((err) => {
    console.log(err);
  })

// создаем экземпляры класса FormValidator
const formProfile = new FormValidator(validationConfig, profileForm);
formProfile.enableValidation();
const formCard = new FormValidator(validationConfig, formElementCard);
formCard.enableValidation();
const formAvatar = new FormValidator(validationConfig, avatarForm);
formAvatar.enableValidation();

// создаем экземпляры класса PopupWithImage
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

// функция открытия попапа с картинкой
function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// создаем экземпляр класса PopupWithForm
const profilePopup = new PopupWithForm(popupProfile, (data) => {
  buttonLoadingSubmit(true);
  api.editUser(data)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoadingSubmit(false);
      profilePopup.close();
    })
});
profilePopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для редактирования аватара
const avatarPopup = new PopupWithForm(popupAvatar, (data) => {
  buttonLoadingSubmit(true);
  api.editAvatar(data)
    .then(() => {
      const avatarInfo = userInfo.getAvatarInfo(data);
      userInfo.renderAvatar(avatarInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoadingSubmit(false);
      avatarPopup.close();
    })
});
avatarPopup.setEventListeners();

// создаем экземпляр класса PopupWithForm (новую карточку)
const cardPopup = new PopupWithForm(popupCard, (data) => {
  const inputNameCard = data.namecard; 
  const inputLinkCard = data.linkcard; 
  const newCard = { 
    link: inputLinkCard, 
    name: inputNameCard 
  }  
  buttonLoadingSubmit(true);
  api.addCard(newCard)
    .then((newCard) => {
      const cardImage = createCard(newCard);
      cardsList.prependItem(cardImage);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoadingSubmit(false);
      cardPopup.close();
    })
});
cardPopup.setEventListeners();

// прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
// передаем в качестве аргумента колбек функцию передачи данных из профеля в поля формы при открытии попапа profile
popupOpenButtonProfile.addEventListener('click', () => { 
  // вызываем публичный метод очистки полей от ошибки
  formProfile.clearError();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.nameUser;
  jobInput.value = userData.aboutUser; 
  profilePopup.open();
});

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', () => {
  // вызываем публичный метод очистки полей от ошибки
  formCard.clearError();
  cardPopup.open();
});

//прикрепляем обработчик по клику на кнопку "Редактировать аватар"
profileEditButtonAvatar.addEventListener('click', () => {
  // вызываем публичный метод очистки полей от ошибки
  formAvatar.clearError();
  avatarPopup.open();
});