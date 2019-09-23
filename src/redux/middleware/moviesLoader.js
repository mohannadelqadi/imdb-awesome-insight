import { MoviesActions } from './../actionsTypes';
import { getMoviesFromDateToDate, getMovieById } from './../../modules/Movies';

export const loadLatestMoviesFromApi = ({ dispatch }) => next => action => {

    if (action.type === MoviesActions.LOAD_LATEST_MOVIES_ACTION) {

        let todayDate = new Date();

        let toMonthString = todayDate.getMonth() + 1,
            toDayString = todayDate.getDate();

        if (toMonthString.toString().length < 2) {
            toMonthString = '0' + toMonthString;
        }

        if (toDayString.toString().length < 2) {
            toDayString = '0' + toDayString;
        }

        let toDateFilter = `${todayDate.getFullYear()}-${toMonthString}-${toDayString}`;

        todayDate.setMonth(-7);

        if (toMonthString.toString().length < 2) {
            toMonthString = '0' + toMonthString;
        }

        if (toDayString.toString().length < 2) {
            toDayString = '0' + toDayString;
        }

        let fromDateFilter = `${todayDate.getFullYear()}-${toMonthString}-${toDayString}`;

        getMoviesFromDateToDate(fromDateFilter, toDateFilter).then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: MoviesActions.LOAD_LATEST_MOVIES,
                    payload: responseJson
                });
            }).catch((error) => {
                console.error(error);
                dispatch({
                    type: MoviesActions.LOAD_LATEST_MOVIES,
                    payload: false
                });
            });


    }

    return next(action);
}

export const loadMovieDetailsByIdFromApi = ({ dispatch }) => next => action => {

    if (action.type === MoviesActions.LOAD_MOVIE_DETAILS_ACTION) {

        let movieId = action.payload;

        getMovieById(action.payload).then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: MoviesActions.LOAD_MOVIE_DETAILS,
                    payload: { movieId: movieId, data: responseJson }
                });
            }).catch((error) => {
                console.error(error);
                dispatch({
                    type: MoviesActions.LOAD_MOVIE_DETAILS,
                    payload: { movieId: movieId, data: false }
                });
            });

    }

    return next(action);
}
