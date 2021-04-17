export default class UserInfo {
  constructor({ avatarSelector, nameSelector, aboutSelector }) {
    this._avatarSelector = document.querySelector(avatarSelector);
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

  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
  }

}