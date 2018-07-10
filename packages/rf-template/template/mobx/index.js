import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from "./registerServiceWorker";
import App from './containers/App';
import Store from './modules/store';
// import updataPrompt from "./components/UpDataPrompt";

const store = new Store();
ReactDOM.render(<App store={store} />, document.getElementById('root'));

// register service worker
// registerServiceWorker(updataPrompt);
