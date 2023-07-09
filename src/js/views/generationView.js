class GenerationView {
  _data;

  load(data) {
    this._data = data;
    return this._generateMarkup();
  }

  _generateMarkup() {
    return this._data
      .map(
        (gen, i) => `
        <div class="slide slide--${i + 1}">
            <button class="btn-generation btn-secondary" data-go-to-generation="${
              i + 1
            }">${gen.name}</button>
        </div>`
      )
      .join('');
  }
}

export default new GenerationView();
