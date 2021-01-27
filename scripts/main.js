// Находим форму элементы DOM
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#about-me');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value;
    jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let overlay = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = overlay.querySelector('.popup__close');


//функция открытия попапа 
function togglePopup(evt) {
  evt.preventDefault();
  overlay.classList.toggle('popup_opened');
}

//функция закрытия попапа (по оверлоу)
function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup(evt)
  }
}

//прикрепляем обработчик по клику на кнопку "Редактировать профиль" 
popupOpenButton.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на кнопку "Закрыть попап"
popupCloseButton.addEventListener('click', togglePopup);

//прикрепляем обработчик по клику на оверлоу
overlay.addEventListener('click', closePopup);