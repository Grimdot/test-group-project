import moviesAPI from './moviesAPI';
import moment from 'moment';

import { refs } from './refs';

const filmService = new moviesAPI();

export const render = films => {
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
