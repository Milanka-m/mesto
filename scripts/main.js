// находим все попапы на странице
const popupElements = document.querySelectorAll('.popup');
// получаем массив из попапов
const popupElementList = Array.from(popupElements);
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
// Находим кнопку сабмита формы profile
const profileFormButton = profileForm.querySelector('.popup-profile-form-button');
// Выбираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Находим попап картинки и его элементы
const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup-image-close');
const popupImageIllustratoin = popupImage.querySelector('.popup-image__illustration');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');

// Находим попап card, кнопки добавления карточки и закрытия попапа
const popupCard = document.querySelector('.popup-add-cards');
const popupOpenButtonCard = document.querySelector('.profile__button-add');
const popupCloseButtonCard = popupCard.querySelector('.popup-add-cards-close');

// Находим форму card
const formElementCard = document.forms.card;
// Находим из формы card значение полей
const nameInputCard = formElementCard.elements.namecard;
const linkInputCard = formElementCard.elements.linkcard;
// Находим кнопку сабмита формы card
const formElementCardButton = formElementCard.querySelector('.popup-add-cards-form-button');

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

// функция, которая очищает ошибки полей формы
function clearError(popupElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  // находим форму
  const formElement = popupElement.querySelector(formSelector);
  // находим все поля внутри формы
  // сделаем из них массив методом Array.from
  const inputList = Array.from(popupElement.querySelectorAll(inputSelector));
  // находим кнопку сабмита формы
  const buttonElement = popupElement.querySelector(submitButtonSelector);
  // обойдем все элементы полученной коллекции 
  inputList.forEach((inputElement) => {
    // скроем все ошибки при открытии попапа
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

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

//функция закрытия попапа по оверлоу 
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
  newImageItem.alt = item.name;
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
  popupOpenButtonImage.addEventListener('click', () => {openPopupImage(item)});
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
  formElementCard.reset();
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
function openPopupImage(item) {
  popupImageIllustratoin.src = item.link;
  popupImageCaption.textContent = item.name;
  openPopup(popupImage);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitAddCard);

// прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
// передаем в качестве аргумента колбек функцию передачи данных из профеля в поля формы при открытии попапа profile
popupOpenButtonProfile.addEventListener('click', () => { 
  // вызываем функцию очистки полей от ошибки
  clearError(popupProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

//прикрепляем обработчик по клику на кнопку "Добавить данные"
popupOpenButtonCard.addEventListener('click', () => {
  // вызываем функцию очистки полей от ошибки
  clearError(popupCard, validationConfig);
  openPopup(popupCard);
});
//прикрепляем обработчик по клику на кнопку "Закрыть попап" для троих попапов
popupCloseButtonProfile.addEventListener('click', () => {closePopup(popupProfile)});
popupCloseButtonCard.addEventListener('click', () => {closePopup(popupCard)});
popupCloseButtonImage.addEventListener('click', () => {closePopup(popupImage)});



