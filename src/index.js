import moviesAPI from './js/moviesAPI';

import { render } from './js/render';
import { refs } from './js/refs';
import { makePagination } from './js/pagination';
import { modal, renderModal, afterModalShow } from './js/modal';

const filmService = new moviesAPI();

const onFormSubmit = e => {
  e.preventDefault();

  const inputValue = e.target.elements.searchQueue.value.trim();

  if (!inputValue) {
    return;
  }

  paginationContainer.innerHTML = '';

  filmService.fetchFilmByName(inputValue).then(r => {
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

const handleGalleryClick = e => {
  const filmId = e.target.parentNode.dataset.id;

  if (!filmId) {
    return;
  }

  filmService.fetchFilmById(filmId).then(r => {
    modal.show(afterModalShow);
    renderModal(r.data);
  });
};

const firstFetch = () => {
  filmService
    .fetchTrendingFilms()
    .then(r => {
      render(r.data.results);
    })
    .catch(console.log);

  makePagination();
};

firstFetch();

refs.gallery.addEventListener('click', handleGalleryClick);
refs.form.addEventListener('submit', onFormSubmit);
