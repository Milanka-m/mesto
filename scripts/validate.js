// функция валидации всех форм
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
}); */

/* function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    profileFormButton.removeAttribute('disabled');
    profileFormButton.classList.remove('popup__form-button_disabled'); 
  } else {
    profileFormButton.setAttribute('disabled', true);
    profileFormButton.classList.add('popup__form-button_disabled'); 
  }
}
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы (можно указывать как e или evt или event)                                       
  // Вставили новые значения полей с помощью textContent
  setSubmitButtonState(false);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  // Вызываем функцию закрытия попапа (попап profile в качестве аргумента)
  closePopup(popupProfile);
});

profileForm.addEventListener('input', function (evt) {
  evt.preventDefault();
  const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
  setSubmitButtonState(isValid);
}); */