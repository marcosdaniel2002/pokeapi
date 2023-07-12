import { SliderView } from './sliderView';

class DetailsView {
  _parentElement = document.querySelector('.slider-card-detail');

  constructor() {
    this._addHandlersCloseModal();
  }

  load(data, id) {
    const arr = this._arrayOfMarkups(data);
    const index = data.findIndex(pokemon => pokemon.id == id);
    new SliderView(this._parentElement, arr, index);
    this._toggleClass();
  }

  _arrayOfMarkups(data) {
    return data.map(
      pokemon => `
    <div class="card-detail">
        <button class="card-detail__btn-close">&times;</button>
        <span class="card-detail__number">#${pokemon.id
          .toString()
          .padStart(4, '0')}</span>
        <img
            class="card-detail__image"
            src="${pokemon.image}"
            alt=""
        />
        <div class="card-detail__card_types">
        ${pokemon.types
          .map(
            type =>
              `<div class="pkm-type ${type}"><span>${type.toUpperCase()}</span></div>`
          )
          .join('')}
        </div>
        <span class="card-detail__description">${pokemon.description}</span>
        <button class="card-detail__button-capture btn-quaternary">
            Capture
        </button>
        <button class="card-detail__button-release btn-primary display-none">
            Release
        </button>
    </div>`
    );
  }

  _toggleClass() {
    this._parentElement.classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
    document.body.classList.toggle('fixed');
  }

  _addHandlersCloseModal() {
    this._parentElement.addEventListener('click', e => {
      const btnClose = e.target.closest('.card-detail__btn-close');
      if (!btnClose) return;

      this._toggleClass();
    });

    document
      .querySelector('.overlay')
      .addEventListener('click', this._toggleClass.bind(this));

    document.addEventListener('keydown', e => {
      if (
        e.key === 'Escape' &&
        !this._parentElement.classList.contains('hidden')
      ) {
        this._toggleClass();
      }
    });
  }
}

export default new DetailsView();
