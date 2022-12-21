import moviesAPI from './moviesAPI';
import moment from 'moment';

import { refs } from './refs';
import { getCurrentUser } from './firebase';
import { ref } from 'firebase/database';

const filmService = new moviesAPI();

export const homeRender = films => {
  filmService.fetchGenres().then(r => {
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
    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
  });
};

export const lybraryRender = film => {
  const markup = film.map(item => {
    const { genres, id, poster_path, original_title } = item.data;
    const releaseYear = moment(item.data.release_date).format('YYYY');

    const filmGenres = genres.map(genre => genre.name);

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

  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
};

export const renderBtn = authState => {
  let markup = '';
  if (!authState) {
    markup = `            
          <button class="auth-btn" data-type = 'sign-in' type="button">
            Sign in
          </button>`;
  } else {
    markup = `            
          <button class="auth-btn"  data-type = 'log-out' type="button">
            Log out
          </button>`;
  }
  refs.authBtnWrap.innerHTML = '';
  refs.authBtnWrap.insertAdjacentHTML('beforeend', markup);
};
