import React, {lazy, Suspense, useState, useEffect } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Why are we not creating a browser router anymore?
//Well this is nothing related to microfrontend at all. This is just how we Router Dom works. 

// whenever we create a browser router that internally creates an instance of browser history
//for us, we need to get access to that history instance so that we can somehow programmatically redirect
//the user around our application, namely whenever the value of, say, is signed and changes and we want to write out all the logic for this directly into this component.
//To get access to the history that is created by browser router is rather challenging to do so on this line.
//<Router history={history}>
//If you are trying to get access to history in the same component where you create the browser router.
//And the way that we get around this is by creating the history manually, as we've done right here, reading an instance of a generic router and then telling it which copy of history we wanted to use.
//So again, this is something related to react router dom, nothing related to microfrontend or anything like that.

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Progress from './components/Progress';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

//lazy import so we do not import anything until we're very sure that we want to show content related to it.
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
    //using useState React hook and setting initial value to false
    //We could also use Redux here
    const [isSignedIn, setIsSignedIn] = useState(false);

    //gets triggered whenever "isSignedIn" value changes
    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    //if we ever try to go to dashboard and the user is not signed in, just redirect them to the landing
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};