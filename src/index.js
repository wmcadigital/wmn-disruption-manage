import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import App from 'components/App/App';
import * as serviceWorker from './serviceWorker';

// Only run sentry in production env
if (process.env.NODE_ENV === 'production')
  Sentry.init({ dsn: 'https://a0307fc99896441eb64f3f5cf0f12d77@o378798.ingest.sentry.io/5279786' });

ReactDOM.render(<App />, document.getElementById('wmn-disruption-manage-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
