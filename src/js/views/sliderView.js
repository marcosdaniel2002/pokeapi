import View from './View';

export class SliderView extends View {
  constructor(parent, arrayOfMarkups, numberSlider = 0) {
    super();
    this._parentElement = parent;
    this.render(arrayOfMarkups);
    this._activeSlider(numberSlider);
  }

  _generateMarkup() {
    return `
      ${this._data
        .map(
          (d, i) => `
      <div class="slide slide--${i + 1}">${d}</div>
      `
        )
        .join('')}
      <button class="slider__btn slider__btn--left">&larr;</button>
      <button class="slider__btn slider__btn--right">&rarr;</button>
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

  _activeSlider(start) {
    this._btnRight = this._parentElement.querySelector('.slider__btn--right');
    this._btnLeft = this._parentElement.querySelector('.slider__btn--left');
    this._slides = this._parentElement.querySelectorAll('.slide');
    this._curSlide = 0;
    this._maxSlide = this._slides.length;
    this._addHandlerArrows();
    this._goToSlide(start);
  }
}
