import { SliderView } from './sliderView';

class GenerationView {
  _parentElement = document.querySelector('.slider-generations');

  load(data) {
    const arr = this._arrayOfMarkups(data);
    new SliderView(this._parentElement, arr);
  }

  _arrayOfMarkups(data) {
    return data.map(
      (gen, i) => `
            <button class="btn-generation btn-secondary" data-go-to-generation="${
              i + 1
            }">${gen.name}</button>`
    );
  }

  addHandlerGenerationView(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-generation');

      if (!btn) return;
      const goToGeneration = btn.dataset.goToGeneration;

      handler(goToGeneration);
    });
  }
}

export default new GenerationView();

// _generateMarkup() {
//   return this._data
//     .map(
//       (gen, i) => `
//       <div class="slide slide--${i + 1}">
//           <button class="btn-generation btn-secondary" data-go-to-generation="${
//             i + 1
//           }">${gen.name}</button>
//       </div>`
//     )
//     .join('');
// }
