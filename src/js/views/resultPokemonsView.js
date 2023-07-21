import View from './View';
import imagen1 from '../../images/getting_ready.gif';
import imagen2 from '../../images/Pokebola-pokeball-png-0.png';

class ResultPokemonsView extends View {
  _parentElement = document.querySelector('.cards');

  _generateMarkup() {
    return this._data.map(this._generateMarkupCards).join('');
  }

  _generateMarkupCards(result) {
    return `
    <div class="card" data-id="${result.id}"><img
        class="card__capture ${result.bookmark ? '' : 'hidden'}"
        src="${imagen2}"
        alt=""/>
        <img
            class="card__image"
            src="${result.image}"
            alt=""/>
        <span class="card__name">${result.name}</span>
        <div class="card_types">
            ${result.types
              .map(
                type =>
                  `<div class="pkm-type ${type}"><span>${type.toUpperCase()}</span></div>`
              )
              .join('')}
        </div>
    </div>
    `;
  }

  _generateMarkupLoad() {
    return `
      <img
      class="cards__load-image"
      src="${imagen1}"
      alt=""/>
    `;
  }

  checkCapturePokeballImage(id, captured = false) {
    const card = this._parentElement.querySelector(`[data-id="${id}"]`);

    captured
      ? card?.firstElementChild.classList.remove('hidden')
      : card?.firstElementChild.classList.add('hidden');
  }

  // removePokeballIcon(id) {
  //   this._parentElement
  //     .querySelector(`[data-id="${id}"]`)
  //     ?.firstElementChild.remove();
  // }

  // addPokeballIcon(id) {
  //   const html = `<img
  //   class="card__capture"
  //   src="${imagen2}"
  //   alt=""/>`;
  //   this._parentElement
  //     .querySelector(`[data-id="${id}"]`)
  //     ?.insertAdjacentHTML('afterbegin', html);
  // }

  addHandlerCardDetail(handler) {
    this._parentElement.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      handler(card.dataset.id);
    });
  }
}

export default new ResultPokemonsView();
