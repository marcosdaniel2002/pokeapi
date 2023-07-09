import View from './View';

class ResultPokemonsView extends View {
  _parentElement = document.querySelector('.cards');

  _generateMarkup() {
    return this._data.map(this._generateMarkupCards).join('');
  }

  _generateMarkupCards(result) {
    return `
    <div class="card" data-id="${result.id}">
        <img
            class="card__capture"
            src="src/images/Pokebola-pokeball-png-0.png"
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
}

export default new ResultPokemonsView();
