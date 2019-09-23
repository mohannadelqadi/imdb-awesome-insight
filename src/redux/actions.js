import { MoviesActions, PersonsActions } from './actionsTypes'

export const loadLatestMovies = () => {
    return {
        type: MoviesActions.LOAD_LATEST_MOVIES_ACTION,
        payload: false
    }
}

export const loadMovieDetailsById = (movieId) => {
    return dispatch => {
        dispatch({
            type: MoviesActions.LOAD_MOVIE_DETAILS_ACTION,
            payload: movieId
        });
        dispatch({
            type: PersonsActions.LOAD_MOVIE_CNC_ACTION,
            payload: movieId
        });
    }
}

