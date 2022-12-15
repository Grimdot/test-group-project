import { refs } from './refs';
import { spinnerStart, spinnerStop } from './spinner';
import moviesAPI from './moviesAPI';
import moment from 'moment';

const filmService = new moviesAPI();

const ids = JSON.parse(localStorage.getItem('queue-list'));

const makeRender = array => {
  const markup = array.map(item => {
    const { id, poster_path, original_title } = item.data;

    const releaseYear = moment(item.data.release_date).format('YYYY');

    return `
        <li class="gallery-item" data-id = '${id}'>
                <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="film poster" class='film-poster'/>
                <p class="film-name">${original_title}</p>
                <p class="film-descr">
                    <span class="film-genres"></span> |
                    <span class="film-premier">${releaseYear}</span>
                </p>
        </li>`;
  });

  console.log(markup.join(''));

  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
};

Promise.all(filmService.fetcByMultipleIds(ids)).then(r => {
  console.log(r);
  makeRender(r);
});
