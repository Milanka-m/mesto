// Находим попап profile, кнопки редактирования профиля и закрытия попапа
export const popupProfile = '.popup-profile';
export const popupOpenButtonProfile = document.querySelector('.profile__button-edit');

// Находим форму profile
export const profileForm = document.forms.profile;
// Находим из формы значения полей
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.about;

// Выбираем элементы, куда должны быть вставлены значения полей
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// Находим попап card, кнопки добавления карточки и закрытия попапа
export const popupCard = '.popup-add-cards';
export const popupOpenButtonCard = document.querySelector('.profile__button-add');

// Находим форму card
export const formElementCard = document.forms.card;
// Находим из формы card значение полей
export const nameInputCard = formElementCard.elements.namecard;
export const linkInputCard = formElementCard.elements.linkcard;

// Находим блок для вставки карточек
export const elementsCards = '.elements';

// Находим попап картинки и его элементы
export const popupImage = '.popup-image';

// массив из 6-ти карточек которые должны отобразится на странице при загрузке
export const initialCards = [
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

export const validationConfig = { 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: '.popup__form-button', 
  inactiveButtonClass: 'popup__form-button_inactive', 
  inputErrorClass: 'popup__form-input-type-error', 
  errorClass: 'popup__form-input-error_active' 
}; 
