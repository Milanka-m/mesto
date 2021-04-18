// Находим попап profile, кнопки редактирования профиля и закрытия попапа
export const popupProfile = '.popup-profile';
export const popupOpenButtonProfile = document.querySelector('.profile__button-edit');

// Находим форму profile
export const profileForm = document.forms.profile;
// Находим из формы значения полей
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.about;

export const profileAvatar = '.profile__avatar';
export const profileTitle = '.profile__title';
export const profileSubtitle = '.profile__subtitle';
export const profileEditButtonAvatar = document.querySelector('.profile__button-avatar');

// Находим попап card, кнопки добавления карточки и закрытия попапа
export const popupCard = '.popup-add-cards';
export const popupOpenButtonCard = document.querySelector('.profile__button-add');

//находим попап редактирования аватара
export const popupAvatar = '.popup-profile-avatar';

//находим форму avatar
export const avatarForm = document.forms.avatar;

// Находим форму card
export const formElementCard = document.forms.card;

// Находим блок для вставки карточек
export const elementsCards = '.elements';

// Находим попап картинки и его элементы
export const popupImage = '.popup-image';

// Находим попап удаления карточки
export const popupRemoveCards = '.popup-remove-cards';
// находим template контейнер
export const cardSelector = '.template';

export const validationConfig = { 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: '.popup__form-button', 
  inactiveButtonClass: 'popup__form-button_inactive', 
  inputErrorClass: 'popup__form-input-type-error', 
  errorClass: 'popup__form-input-error_active' 
}; 
