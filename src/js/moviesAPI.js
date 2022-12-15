import axios from 'axios';

const API_KEY = '49d58752bc6e5141ad9221de58add4b1';

export default class moviesAPI {
  constructor() {
    this.page = 1;
  }

  fetchGenres() {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
`);
  }

  fetchTrendingFilms() {
    return axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}&append_to_response=genres`
    );
  }

  fetchFilmByName(name) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`
    );
  }

  fetchFilmById(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
  }

  fetcByMultipleIds(array) {
    return array.map(id => {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      );
    });
  }
}
