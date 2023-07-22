import View from './View';
import imagen1 from '../../images/1970401_b70f6.gif';

class CapturedPokemonView extends View {
  _parentElement = document.querySelector('.captured-pokemons__cards');
  _pokeballButton = document.querySelector('.pokeball');
  _modal = document.querySelector('.captured-pokemons');
  _btnCLose = document.querySelector('.captured-pokemons__close');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this._addHandlerPokeballButton();
    this._addHandlerPokeballClose();
  }

  _generateMarkup() {
    this._timeOutShowModal();
    if (this._checkExistPokemonsCaptured()) {
      return this._data.pokemons
        .map(
          (pokemon, i) => `
    <div class="captured-card ${
      i < this._data.maxPokemons ? '' : 'captured-card--last-pokemon'
    }" data-id="${pokemon.id}">
        <div class="captured-card__container-image">
        <img
            class="captured-card__image"
            src="${pokemon.icon}"
            alt=""/>
        </div>
        <i class="captured-card__remove far fa-times bg-gray-light-9 ${
          this._checkCapacity() && i < this._data.maxPokemons
            ? ''
            : 'display-none'
        }"></i>
    </div>
    `
        )
        .join('');
    } else {
      return `<img src="${imagen1}" alt="" />`;
    }
  }

  _checkExistPokemonsCaptured() {
    if (this._data.pokemons.length === 0) {
      this._pokeballButton.classList.remove('pokeball-animated');
      return false;
    }
    if (this._data.pokemons.length > 0) {
      this._pokeballButton.classList.add('pokeball-animated');
      return true;
    }
  }
  _checkCapacity() {
    if (this._data.pokemons.length > this._data.maxPokemons) {
      this._toggleShowModal();
      this._toggleOverlay();
      this._toggleBtnClose();
      return true;
    }
    return false;
  }

  addHandlerReplacePokemon(handler) {
    this._parentElement.addEventListener('click', e => {
      const btnReplacePokemon = e.target.closest('.captured-card__remove');
      if (!btnReplacePokemon) return;

      const { id } = btnReplacePokemon.parentElement.dataset;
      handler(+id, true);
      this._toggleOverlay();
      this._toggleBtnClose();
    });
  }

  _createElementFromHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    return div.firstChild;
  }

  _openModal() {
    if (!this._modal.classList.contains('show')) {
      this._modal.classList.add('show');
      document.body.style.overflowY = 'hidden';
    }
  }

  _closeModal() {
    if (this._modal.classList.contains('show')) {
      this._modal.classList.remove('show');
      document.body.style.overflowY = 'visible';
    }
  }

  _timeOutShowModal() {
    this._openModal();
    setTimeout(this._toggleShowModal.bind(this), 1500);
  }

  _toggleBtnClose() {
    this._btnCLose.classList.toggle('display-none');
  }

  _toggleShowModal() {
    this._modal.classList.contains('show')
      ? this._closeModal()
      : this._openModal();
  }

  _toggleOverlay() {
    // this._overlay.classList.toggle('hidden');
    this._overlay.classList.toggle('z-index-1090');
  }

  _addHandlerPokeballButton() {
    this._pokeballButton.addEventListener('click', () => {
      this._toggleShowModal();
    });
  }

  _addHandlerPokeballClose() {
    this._btnCLose.addEventListener('click', () => {
      this._toggleShowModal();
    });
  }
}

export default new CapturedPokemonView();
