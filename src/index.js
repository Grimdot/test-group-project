import moviesAPI from './js/moviesAPI';

import { homeRender } from './js/render';
import { refs } from './js/refs';
import { makePagination, paginationContainer } from './js/pagination';
import { modal, renderModal, afterModalShow } from './js/modal';
import { spinnerStart, spinnerStop } from './js/spinner';

const filmService = new moviesAPI();

const onFormSubmit = e => {
  e.preventDefault();

  const inputValue = e.target.elements.searchQueue.value.trim();

  if (!inputValue) {
    return;
  }

  refs.paginationContainer.innerHTML = '';

  filmService.fetchFilmByName(inputValue).then(r => {
    if (r.data.total_results === 0) {
      // showFetchError();
      return;
    }
    // hideFetchError();

    homeRender(r.data.results);
    console.log(r.data);
  });

  refs.form.reset();
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
  spinnerStart();

  filmService
    .fetchTrendingFilms()
    .then(r => {
      console.log(r);
      spinnerStop();
      homeRender(r.data.results);
      makePagination(r.data.total_pages, homeRender);
    })
    .catch(console.log);
};

firstFetch();

refs.gallery.addEventListener('click', handleGalleryClick);
refs.form.addEventListener('submit', onFormSubmit);
