export class Section {
  constructor({items, renderer}, containerSelector) {
    this._itemsForRenderer = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
 }

  // clear() {
  //   this._container.innerHTML = '';
  // }
  renderItems() {
    // this.clear();
    this._itemsForRenderer.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}
