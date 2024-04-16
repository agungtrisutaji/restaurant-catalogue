import 'regenerator-runtime';
import '../scss/styles.scss';

import App from './view/app';

require('./vendor');

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
