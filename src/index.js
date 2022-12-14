import filmService from './js/filmService';
import moment from 'moment';

const filmsService = new filmService();
const gallery = document.querySelector('.gallery');
const pagination = document.querySelector('.pagination-btn-list');

const render = films => {
  gallery.innerHTML = '';

  filmsService.fetchGenres().then(r => {
    const genres = r.data.genres;

    const markup = films.map(film => {
      const genresId = film.genre_ids;
      const releaseYear = moment(film.release_date).format('YYYY');

      const filmGenres = genresId.map(id => {
        for (genre of genres) {
          if (id === genre.id) {
            return genre.name;
          }
        }
      });

      return `<li class="gallery-item">
      <a href="./" class="gallery-item-link link">
        <img src="https://image.tmdb.org/t/p/w300${
          film.poster_path
        }" alt="film poster" class='film-poster'/>
        <p class="film-name">${film.original_title}</p>
        <p class="film-descr">
          <span class="film-genres">${filmGenres.join(', ')}</span> |
          <span class="film-premier">${releaseYear}</span>
        </p>
      </a>
    </li>`;
    });
    gallery.insertAdjacentHTML('beforeend', markup.join(''));
    renderPagination();
  });
};

const renderPagination = () => {
  let currentPage = Number(filmsService.page);
  let markup = '';

  if (currentPage === 1) {
    const paginationBtnsMarkup = Array(5)
      .fill()
      .map((_, idx) => {
        return idx + currentPage === currentPage
          ? `<li><button data-page="${
              idx + currentPage
            }" class='pagination-btn current-page-btn'>${
              idx + currentPage
            }</button></li>`
          : `<li><button data-page="${
              idx + currentPage
            }" class='pagination-btn'>${idx + currentPage}</button></li>`;
      });

    paginationBtnsMarkup.push(`
      <p class= 'pagination-dots'>...</p>
      <li><button data-page="20" class ='pagination-btn extreme-btns'>20</button></li>
    <li><button data-page="${
      currentPage + 1
    }" class ='pagination-btn arrow-btn'>></button></li>
      `);

    markup = paginationBtnsMarkup.join('');
  }

  if (currentPage > 1 && currentPage <= 4) {
    const paginationBtnsMarkup = Array(5)
      .fill()
      .map((_, idx) => {
        return idx + 1 === currentPage
          ? `<li><button data-page="${
              idx + 1
            }" class='pagination-btn current-page-btn'>${idx + 1}</button></li>`
          : `<li><button data-page="${idx + 1}" class='pagination-btn'>${
              idx + 1
            }</button></li>`;
      });

    paginationBtnsMarkup.unshift(
      `<li><button data-page="${
        currentPage - 1
      }" class ='pagination-btn arrow-btn'><</button></li>`
    );
    paginationBtnsMarkup.push(`
      <p class= 'pagination-dots'>...</p>
      <li><button data-page="20" class ='pagination-btn extreme-btns'>20</button></li>
    <li><button data-page="${
      currentPage + 1
    }" class ='pagination-btn arrow-btn'>></button></li>
      `);

    markup = paginationBtnsMarkup.join('');
  }

  if (currentPage >= 5 && currentPage <= 15) {
    markup = `
    <li>
        <button data-page="${
          currentPage - 1
        }" class ='pagination-btn arrow-btn'><</button>
    </li>
    <li>
        <button data-page="1" class ='pagination-btn extreme-btns'>1</button>
    </li>
    <p class= 'pagination-dots'>...</p>
    <li>
        <button data-page="${currentPage - 2}" class ='pagination-btn'>${
      currentPage - 2
    }</button>
    </li>
    <li>
        <button data-page="${currentPage - 1}" class ='pagination-btn'>${
      currentPage - 1
    }</button>
    </li>
    <li>
        <button data-page="${currentPage}" class ='pagination-btn current-page-btn'>${currentPage}</button>
    </li>
    <li>
        <button data-page="${currentPage + 1}" class ='pagination-btn'>${
      currentPage + 1
    }</button>
    </li>
    <li>
        <button data-page="${currentPage + 2}" class ='pagination-btn'>${
      currentPage + 2
    }</button>
    </li>
        <p class= 'pagination-dots'>...</p>
    <li>
        <button data-page="20" class ='pagination-btn extreme-btns'>20</button>
    </li>
    <li>
        <button data-page="${
          currentPage + 1
        }" class ='pagination-btn arrow-btn'>></button>
    </li>
        `;
  }

  if (currentPage >= 16 && currentPage < 20) {
    const paginationBtnsMarkup = Array(5)
      .fill()
      .map((_, idx) => {
        return idx + 16 === currentPage
          ? `<li><button data-page="${
              idx + 16
            }" class='pagination-btn current-page-btn'>${
              idx + 16
            }</button></li>`
          : `<li><button data-page="${idx + 16}" class='pagination-btn'>${
              idx + 16
            }</button></li>`;
      });

    paginationBtnsMarkup.unshift(
      `<li><button data-page="${
        currentPage - 1
      }" class ='pagination-btn arrow-btn'><</button></li>
        <li>
        <button data-page="1" class ='pagination-btn extreme-btns'>1</button>
        </li>
        <p class= 'pagination-dots'>...</p>`
    );
    paginationBtnsMarkup.push(`
    <li><button data-page="${
      currentPage + 1
    }" class ='pagination-btn arrow-btn'>></button></li>
      `);

    markup = paginationBtnsMarkup.join('');
  }

  if (currentPage === 20) {
    const paginationBtnsMarkup = Array(6)
      .fill()
      .map((_, idx) => {
        return idx + 15 === currentPage
          ? `<li><button data-page="${
              idx + 15
            }" class='pagination-btn current-page-btn'>${
              idx + 15
            }</button></li>`
          : `<li><button data-page="${idx + 15}" class='pagination-btn'>${
              idx + 15
            }</button></li>`;
      });

    paginationBtnsMarkup.unshift(
      `<li><button data-page="${
        currentPage - 1
      }" class ='pagination-btn arrow-btn'><</button></li>
        <li>
        <button data-page="1" class ='pagination-btn extreme-btns'>1</button>
        </li>
        <p class= 'pagination-dots'>...</p>`
    );

    markup = paginationBtnsMarkup.join('');
  }

  pagination.innerHTML = '';
  pagination.insertAdjacentHTML('beforeend', markup);
};

filmsService
  .fetchTrendingFilms()
  .then(r => {
    console.log(r.data);
    render(r.data.results);
  })
  .catch(console.log);

const handleClick = e => {
  console.log(e.target.dataset.page);

  if (!e.target.dataset.page) {
    return;
  }

  filmsService.page = e.target.dataset.page;

  filmsService
    .fetchTrendingFilms()
    .then(r => {
      console.log(r.data);
      render(r.data.results);
    })
    .catch(console.log);
  renderPagination();
};

pagination.addEventListener('click', handleClick);
