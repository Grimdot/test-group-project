import moviesAPI from './js/moviesAPI';

import { homeRender } from './js/render';
import { refs } from './js/refs';
import { makePagination } from './js/pagination';
import { modal, renderModal, afterModalShow } from './js/modal';
import { spinnerStart, spinnerStop } from './js/spinner';

import { authentificate, logOut } from './js/firebase';
import { getUserData, getCurrentUser } from './js/firebase'
import { getAuth } from 'firebase/auth';
import Notiflix from 'notiflix';

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
      return;
    }

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

refs.googleIn.addEventListener('click', authentificate);
refs.googleOut.addEventListener('click', logOut);

const auth = getAuth();

getCurrentUser(auth).then(r => {console.log(r)
if(r === null) {
  Notiflix.Notify.info('Please sign in')
}
else (  Notiflix.Notify.success(`Hi ${r.displayName}`)
)
});


