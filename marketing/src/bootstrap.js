import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

//Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
    //defaultHistory only avaialble in development mode
    const history = defaultHistory || createMemoryHistory();

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />, el);

    //add a function for the container (host App) to communicate/update the child App
    return {
        //if the parent navigates we call this function
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname != nextPathname) {
                history.push(nextPathname);
            }
        },
    }
};

//If we are in development and in isolation,
//call mount immediately

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot) {
        //the 2nd argument is to prevent the undefined error for 'onNavigate'property in App.js
        // the value can be empty or as below we have set it to create a browser history instance , whenever he called Mt. function in isolation.
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

//We are running through container
//and we should export the mount function
export { mount };