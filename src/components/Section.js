export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  // публичный метод рендера каждого элемента из массива элементов на страницу
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

}