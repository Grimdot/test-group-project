import { refs } from './refs';
import { spinnerStart, spinnerStop } from './spinner';
import { lybraryRender } from './render';
import { modal, renderModal, afterModalShow } from './modal';
import Notiflix from 'notiflix';

import { getUserData, greet, MakeAuthBtn } from './firebase';
import { getAuth } from 'firebase/auth';

import moviesAPI from './moviesAPI';

const filmService = new moviesAPI();

const emptyStorageMarkup = `<p class = 'storage-error'>This storage is empty... Yet :)</p>`;
let uid = null;

const onHeaderBtnsClick = e => {
  if (!e.target.dataset) {
    return;
  }
  if (e.target.dataset.type === 'watchedBtn') {
    watchedFetch();
  }
  if (e.target.dataset.type === 'queueBtn') {
    queueFetch();
  }
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

const watchedFetch = () => {
  spinnerStart();
  const ids = JSON.parse(localStorage.getItem('watched-list'));
  if (!ids) {
    refs.gallery.insertAdjacentHTML('afterbegin', emptyStorageMarkup);
    spinnerStop();
    return;
  }

  Promise.all(filmService.fetcByMultipleIds(ids)).then(r => {
    lybraryRender(r);
    spinnerStop();
  });
};

const queueFetch = () => {
  getUserData().then(r => {
    console.log(r);
  });
  spinnerStart();
  const ids = JSON.parse(localStorage.getItem('queue-list'));
  if (!ids) {
    refs.gallery.insertAdjacentHTML('afterbegin', emptyStorageMarkup);
    spinnerStop();
    return;
  }

  Promise.all(filmService.fetcByMultipleIds(ids)).then(r => {
    lybraryRender(r);
    spinnerStop();
  });
};

queueFetch();

refs.gallery.addEventListener('click', handleGalleryClick);
refs.headerBtns.addEventListener('click', onHeaderBtnsClick);

greet();

MakeAuthBtn();
