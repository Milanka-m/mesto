export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo(nameInputEl, jobInputEl) {
    nameInputEl.value = this.nameSelector.textContent;
    jobInputEl.value = this.aboutSelector.textContent;
    return { nameInputEl, jobInputEl };
  }

  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInputEl, jobInputEl) {
    this.nameSelector.textContent = nameInputEl.value;
    this.aboutSelector.textContent = jobInputEl.value;
  } 

}