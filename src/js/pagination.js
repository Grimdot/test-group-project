import { refs } from './refs';
import { render } from './render';
import moviesAPI from './moviesAPI';

import Pagination from 'tui-pagination';
import { spinnerStart, spinnerStop } from './spinner';

const filmService = new moviesAPI();

export const makePagination = pages => {
  const pagination = new Pagination(refs.paginationContainer, {
    totalItems: pages,
    itemsPerPage: 1,
    visiblePages: 5,
    template: {
      page: '<a href="#" class="pagination-btn">{{page}}</a>',
      currentPage:
        '<strong class="pagination-btn current-page-btn">{{page}}</strong>',
      moveButton:
        '<a href="#" class="move-btns pagination-btn tui-{{type}}">' +
        '<span class="btn-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class=" tui-is-disabled tui-{{type}}">' +
        '<span class="btn-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class=" tui-{{type}}-is-ellip">' +
        '<span class="pagination-btn btn-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('beforeMove', evt => {
    spinnerStart();
    filmService.page = evt.page;
    filmService.fetchTrendingFilms().then(r => {
      render(r.data.results);
      spinnerStop();
    });
  });
};
