import React from '../oldsrc/react';
import ReactDOM from '../oldsrc/react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var configWmca = {
  live: 'https://rtccdisruptions6zqwajo6s.azurewebsites.net/', // Address to call the api
  test: 'http://localhost:7071/', // testing link
  signUp: 'https://wmcadigital.github.io/wmn-disruption-email-alerts/alerts/personal-details.html', // addrsss to the sign up site
};

ReactDOM.render(
  <React.StrictMode>
    <App appConfig={configWmca} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
