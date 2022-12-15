import { render } from './render';
import moviesAPI from './moviesAPI';

const filmService = new moviesAPI();

filmService.fetchTrendingFilms().then(r => {
  render(r.data.results);
});
