import { mark } from 'regenerator-runtime';

export default class View {
  _data;

  render(data) {
    if (!data) {
      this._clear();
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderLoad() {
    const markup = this._generateMarkupLoad();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
