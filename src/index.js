import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import { BrowserRouter, Route } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux';

import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={HomePage} />
            <Route path="/movie/:movieId" exact component={MovieDetails} />
        </BrowserRouter>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
