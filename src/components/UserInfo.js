export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const userInfoContent = {
      nameUser: this._nameSelector.textContent,
      aboutUser: this._aboutSelector.textContent
    }
    return userInfoContent;
  }

  // публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._aboutSelector.textContent = data.about;
  } 

}