import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    if (!this._data.numOfPages || this._data.numOfPages === 1) return '';

    if (this._data.numOfPages > 5) {
      this._paginationAdvanceOptions = true;
      return `
    <button class="pagination__button" id="startBtn" disabled>
        <i class="fa-solid fa-angles-left"></i>
    </button>
    <button class="pagination__button prevNext" data-goto="prev" disabled>
        <i class="fa-solid fa-angle-left"></i>
    </button>

    <div class="pagination__links">
        ${this._generateLinkOfPages()}
    </div>
    <button class="pagination__button prevNext" data-goto="next">
        <i class="fa-solid fa-angle-right"></i>
    </button>
    <button class="pagination__button" id="endBtn">
        <i class="fa-solid fa-angles-right"></i>
    </button>
    `;
    } else {
      this._paginationAdvanceOptions = false;
      return `
        <div class="pagination__links">
            ${this._generateLinkOfPages()}
        </div>
    `;
    }
  }

  _generateLinkOfPages() {
    let markup = '';
    for (let i = 1; i <= this._data.numOfPages; i++) {
      markup += `
      <a class="pagination__link ${
        this._data.page === i ? 'active' : ''
      }" data-goto="${i}">${i}</a>`;
    }
    return markup;
  }

  _paginationActiveLink(page) {
    this._parentElement.querySelector('.active').classList.remove('active');
    this._parentElement
      .querySelector(`[data-goto="${page}"]`)
      .classList.add('active');

    this._currentPage = page;
    this._paginationDisable();
  }

  _paginationDisable() {
    if (!this._paginationAdvanceOptions) return;
    const startBtn = this._parentElement.querySelector('#startBtn');
    const endBtn = this._parentElement.querySelector('#endBtn');
    if (this._currentPage === this._data.numOfPages) {
      endBtn.disabled = true;
      endBtn.previousElementSibling.disabled = true;
      startBtn.disabled = false;
      startBtn.nextElementSibling.disabled = false;

      return;
    }
    if (this._currentPage === 1) {
      startBtn.disabled = true;
      startBtn.nextElementSibling.disabled = true;
      endBtn.disabled = false;
      endBtn.previousElementSibling.disabled = false;

      return;
    }
    startBtn.disabled = false;
    startBtn.nextElementSibling.disabled = false;
    endBtn.disabled = false;
    endBtn.previousElementSibling.disabled = false;
  }

  _paginationPrevNext(btn) {
    const x = btn.dataset.goto === 'next' ? 1 : -1;
    this._paginationActiveLink(this._currentPage + x);
  }

  _paginationStartEnd(btn) {
    if (btn.id === 'startBtn') {
      this._parentElement.querySelector('.active').classList.remove('active');
      this._parentElement
        .querySelector(`[data-goto="1"]`)
        .classList.add('active');

      this._currentPage = 1;
      this._paginationDisable();
    } else {
      this._parentElement.querySelector('.active').classList.remove('active');
      this._parentElement
        .querySelector(`[data-goto="${this._data.numOfPages}"]`)
        .classList.add('active');

      this._currentPage = this._data.numOfPages;
      this._paginationDisable();
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn =
        e.target.closest('.pagination__link') ||
        e.target.closest('.pagination__button');

      if (!btn) return;

      if (
        btn.classList.contains('pagination__link') &&
        !btn.classList.contains('active')
      ) {
        this._paginationActiveLink(+btn.dataset.goto);
        handler(this._currentPage);
        return;
      }

      if (btn.classList.contains('prevNext')) {
        this._paginationPrevNext(btn);
        handler(this._currentPage);
        return;
      } else {
        this._paginationStartEnd(btn);
        handler(this._currentPage);
        return;
      }
    });
  }
}

export default new PaginationView();
