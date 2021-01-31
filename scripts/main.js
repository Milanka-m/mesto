// Находим форму элементы DOM
let formElement = document.querySelector('.popup__form');
// Находим из формы значения полей
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#about');
// Выбираем элементы, куда должны быть вставлены значения полей
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// Находим попап, кнопки редактирования профиля и закрытия попапа
let overlay = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = overlay.querySelector('.popup__close');

//функция открытия попапа 
function togglePopup() {
  // Передаем данные из профеля в поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  // Добавляем класс (видимость попапа)
  overlay.classList.toggle('popup_opened');
}

//функция закрытия попапа по оверлоу
function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    //В момент закрытия модального окна полям ничего не передается
    // Удаляем класс (видимость попапа)
    overlay.classList.toggle('popup_opened');
  }
} 

// функция обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)
                                             
  // Вставили новые значения полей с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // Вызываем функцию закрытия попапа
  closePopup(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
popupOpenButton.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на кнопку "Закрыть попап"
popupCloseButton.addEventListener('click', closePopup);

//прикрепляем обработчик по клику на оверлоу
overlay.addEventListener('mousedown', closePopup);