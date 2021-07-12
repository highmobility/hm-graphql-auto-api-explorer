// Polyfills
import 'core-js/stable';
import App from 'app/App.js';
import { render } from '@optimistdigital/create-frontend/universal-react/client';

process.env.SERVER_PORT = process.env.PORT; // Heroku takes port from process.env.PORT

function hydrate() {
  render(App, document.getElementById('react-app'));
}

hydrate();

/**
 * Hot module replacement
 * Uncomment the code to enable HMR in your app. Documentation:
 * https://webpack.js.org/api/hot-module-replacement/
 */
if (module.hot) {
  module.hot.accept('app/App.js', () => {
    hydrate();
  });
}
