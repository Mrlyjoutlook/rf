import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from "./registerServiceWorker";
import createStore from "./store/createStore";
import App from "./containers/App";
// import updataPrompt from "./components/UpDataPrompt";

// init state
const initialState = window.INITIAL_STATE;
const { store } = createStore(initialState);
ReactDOM.render(<App store={store} />, document.getElementById("root"));

// register service worker
// registerServiceWorker(updataPrompt);
