import View from './View';

class SliderView extends View {
  _parentElement = document.querySelector('.slider');

  // constructor(slides) {
  //   this._slides = slides;
  //   this._addHandlerArrows();
  //   this._goToSlide(0);
  // }
  _generateMarkup() {
    return `
    <div class="slider">
      ${this._data}
      <button class="slider__btn slider__btn--left">&larr;</button>
      <button class="slider__btn slider__btn--right">&rarr;</button>
    </div>
    `;
  }

  _addHandlerArrows() {
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
  }

  _nextSlide() {
    if (this._curSlide === this._maxSlide - 1) {
      this._curSlide = 0;
    } else {
      this._curSlide++;
    }
    this._goToSlide(this._curSlide);
  }

  _prevSlide() {
    if (this._curSlide === 0) {
      this._curSlide = this._maxSlide - 1;
    } else {
      this._curSlide--;
    }
    this._goToSlide(this._curSlide);
  }

  _goToSlide(slide) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  activeSlider() {
    this._btnRight = document.querySelector('.slider__btn--right');
    this._btnLeft = document.querySelector('.slider__btn--left');
    this._slides = document.querySelectorAll('.slide');
    this._curSlide = 0;
    this._maxSlide = this._slides.length;
    this._addHandlerArrows();
    this._goToSlide(0);
  }

  addHandlerSlider(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-generation');

      if (!btn) return;
      const goToGeneration = btn.dataset.goToGeneration;

      handler(goToGeneration);
    });
  }
}

export default new SliderView();
