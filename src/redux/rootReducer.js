import { MoviesActions, PersonsActions } from './actionsTypes';

const initState = {
    latest_movies: null,
    movie_details: [],
    movie_cast_n_crew: []
}

const rootReducer = function (state = initState, { type, payload }) {

    switch (type) {
        case MoviesActions.LOAD_LATEST_MOVIES:
            return Object.assign({}, state, {
                latest_movies: payload
            });
        case MoviesActions.LOAD_MOVIE_DETAILS:
            return Object.assign({}, state, {
                movie_details: state.movie_details.concat(payload)
            });
        case PersonsActions.LOAD_MOVIE_CNC:
            return Object.assign({}, state, {
                movie_cast_n_crew: state.movie_cast_n_crew.concat(payload)
            });
        default:
            return state;
    }

}

export default rootReducer;