import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

import { loadLatestMoviesFromApi, loadMovieDetailsByIdFromApi } from './middleware/moviesLoader';
import { loadCastNCrewByMovieIdFromApi } from './middleware/personsLoader';

const middlewares = [thunk, loadLatestMoviesFromApi, loadMovieDetailsByIdFromApi, loadCastNCrewByMovieIdFromApi];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;