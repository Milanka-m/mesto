export const buttonLoadingSubmit = (isLoading) => {
  const popupElement = document.querySelector('.popup_opened');
  const formElement = popupElement.querySelector('.popup__form');
  const buttonElement = formElement.querySelector('.popup__form-button');

  if (!isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}