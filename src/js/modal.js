import { refs } from './refs';
import moviesAPI from './moviesAPI';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const filmService = new moviesAPI();

export const modal = basicLightbox.create(
  `
<div class = 'modal'>
</div>
`,
  {
    onShow: modal => {
      refs.body.classList.add('scroll-lock');

      document
        .querySelector('body')
        .addEventListener('keydown', onEscModalClose);
    },
    onClose: modal => {
      refs.body.classList.remove('scroll-lock');

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

export const renderModal = filmData => {
  const {
    poster_path,
    title,
    original_title,
    overview,
    vote_count,
    vote_average,
    popularity,
    genres,
    videos,
  } = filmData;

  const filmGenres = genres.map(genre => genre.name).join(', ');

  const trailerLink = videos.results.filter(video => video.type === 'Trailer');

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

</div>`;

  document.querySelector('.modal').innerHTML = '';
  document.querySelector('.modal').insertAdjacentHTML('beforeend', markup);
};

const modalClose = () => {
  modal.close();
};

export const afterModalShow = () => {
  document.querySelector('.close-btn').addEventListener('click', modalClose);
};
