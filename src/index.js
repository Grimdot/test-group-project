import filmService from './js/filmService';
import * as basicLightbox from 'basiclightbox';
import moment from 'moment';
import Pagination from 'tui-pagination';

import 'basiclightbox/dist/basicLightbox.min.css';

const filmsService = new filmService();
const gallery = document.querySelector('.gallery');
const paginationContainer = document.querySelector('.pagination');
const form = document.querySelector('.search-form');
const fetchError = document.querySelector('.error-info');

filmsService
  .fetchTrendingFilms()
  .then(r => {
    hideFetchError();
    render(r.data.results);
  })
  .catch(console.log);

const pagination = new Pagination(paginationContainer, {
  totalItems: 20,
  itemsPerPage: 1,
  visiblePages: 5,
  template: {
    page: '<a href="#" class="pagination-btn">{{page}}</a>',
    currentPage:
      '<strong class="pagination-btn current-page-btn">{{page}}</strong>',
    moveButton:
      '<a href="#" class="move-btns pagination-btn tui-{{type}}">' +
      '<span class="btn-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class=" tui-is-disabled tui-{{type}}">' +
      '<span class="btn-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class=" tui-{{type}}-is-ellip">' +
      '<span class="pagination-btn btn-ellip">...</span>' +
      '</a>',
  },
});

const modal = basicLightbox.create(
  `
<div class = 'modal-wrap'>
<div class = 'modal'>
</div>
</div>
`,
  {
    onShow: modal => {
      document.querySelector('body').classList.add('scroll-lock');

      document
        .querySelector('body')
        .addEventListener('keydown', onEscModalClose);
    },
    onClose: modal => {
      document.querySelector('body').classList.remove('scroll-lock');

      document
        .querySelector('body')
        .removeEventListener('keydown', onEscModalClose);
      document
        .querySelector('.close-btn')
        .removeEventListener('click', modalClose);
    },
  }
);

const onEscModalClose = e => {
  if (e.key != 'Escape') {
    return;
  }
  modal.close();
};

const modalClose = () => {
  modal.close();
};

const clearMarkup = () => {
  gallery.innerHTML = '';
};

const hideFetchError = () => {
  fetchError.classList.add('is-hidden');
};

const showFetchError = () => {
  fetchError.classList.remove('is-hidden');
};

const render = films => {
  clearMarkup();

  filmsService.fetchGenres().then(r => {
    const genres = r.data.genres;

    const markup = films.map(film => {
      const { genre_ids, poster_path, original_title, id } = film;
      const releaseYear = moment(film.release_date).format('YYYY');

      const filmGenres = genre_ids.map(id => {
        for (const genre of genres) {
          if (id === genre.id) {
            return genre.name;
          }
        }
      });

      return `
        <li class="gallery-item" data-id = '${id}'>
                <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="film poster" class='film-poster'/>
                <p class="film-name">${original_title}</p>
                <p class="film-descr">
                    <span class="film-genres">${filmGenres.join(', ')}</span> |
                    <span class="film-premier">${releaseYear}</span>
                </p>
        </li>`;
    });
    gallery.insertAdjacentHTML('beforeend', markup.join(''));
  });
};

const renderModal = filmData => {
  const {
    poster_path,
    title,
    original_title,
    overview,
    vote_count,
    vote_average,
    popularity,
    genres,
  } = filmData;

  const filmGenres = genres.map(genre => genre.name).join(', ');

  const markup = `
  <button type='button' class = 'close-btn'></button>
<img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="film poster" class='modal-poster'/>
<div class = 'modal-description'>
<h2 class = 'modal-title'>${title}</h2>
<div class = 'film-stats'>
<ul class='list modal-categories'>
    <li class = 'modal-categories-item'><p>Vote / Votes</p></li>
    <li class = 'modal-categories-item'><p>Popularity</p></li>
    <li class = 'modal-categories-item'><p>Original Title</p></li>
    <li class = 'modal-categories-item'><p>Genre</p></li>
</ul>
<ul class='list modal-stats'>
    <li class = 'modal-stats-item'><p><span class = 'modal-vote-average'>${vote_average}</span> / <span class = 'modal-vote-count'>${vote_count}</span></p></li>
    <li class = 'modal-stats-item'><p>${popularity}</p></li>
    <li class = 'modal-stats-item'><p>${original_title}</p></li>
    <li class = 'modal-stats-item'><p>${filmGenres}</p></li>
</ul>
</div>
<h3 class='about-title'>About</h3>
<p class = 'modal-overview'>${overview}</p>
<div class = 'modal-btns-wrap'>
<button class = 'btn modal-watched-btn'>Add to watched</button>
<button class = 'btn modal-queue-btn'>Add to queue</button>
</div>
</div>
    `;

  document.querySelector('.modal').innerHTML = '';
  document.querySelector('.modal').insertAdjacentHTML('beforeend', markup);
};

const handleClick = e => {
  console.log(e.target.dataset.page);

  if (!e.target.dataset.page) {
    return;
  }

  filmsService.page = e.target.dataset.page;

  filmsService
    .fetchTrendingFilms()
    .then(r => {
      render(r.data.results);
      renderPagination();
    })
    .catch(console.log);
  renderPagination();
};

const onFormSubmit = e => {
  e.preventDefault();

  const inputValue = e.target.elements.searchQueue.value.trim();

  if (!inputValue) {
    return;
  }

  paginationContainer.innerHTML = '';

  filmsService.fetchFilmByName(inputValue).then(r => {
    if (r.data.total_results === 0) {
      showFetchError();
      return;
    }
    hideFetchError();

    render(r.data.results);
    console.log(r.data);
  });

  form.reset();
};

const afterModalShow = () => {
  document.querySelector('.close-btn').addEventListener('click', modalClose);
};

const handleGalleryClick = e => {
  const filmId = e.target.parentNode.dataset.id;

  if (!filmId) {
    return;
  }

  filmsService.fetchFilmById(filmId).then(r => {
    console.log(r);

    modal.show(afterModalShow);
    renderModal(r.data);
  });
};

gallery.addEventListener('click', handleGalleryClick);
form.addEventListener('submit', onFormSubmit);
pagination.on('beforeMove', evt => {
  console.log(evt.page);
  filmsService.page = evt.page;
  filmsService.fetchTrendingFilms().then(r => {
    render(r.data.results);
  });
});
