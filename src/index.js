import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var configWmca = {
    live: "https://rtccdisruptionsb5phceeso.azurewebsites.net/", // Address to call the api
    test: "http://localhost:7071/", // testing link
    signUp: "https://disruption-sign-up.wmnetwork.co.uk" // addrsss to the sign up site
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
