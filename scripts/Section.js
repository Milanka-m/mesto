export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // публичный метод рендера каждого элемента из массива элементов на страницу
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

}