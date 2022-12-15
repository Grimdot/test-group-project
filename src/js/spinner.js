import { Spinner } from 'spin.js';
import { refs } from './refs';

import 'spin.js/spin.css';

const loader = new Spinner({ color: '#ff6b08', lines: 12, width: 3 });

export const spinnerStart = () => {
  refs.gallery.innerHTML = '';
  loader.spin(refs.gallery);
};

export const spinnerStop = () => {
  loader.stop(refs.gallery);
};
