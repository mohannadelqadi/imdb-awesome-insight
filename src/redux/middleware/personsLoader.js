import { PersonsActions } from './../actionsTypes';
import { LoadMovieCastnCrew } from './../../modules/Persons';

export const loadCastNCrewByMovieIdFromApi = ({ dispatch }) => next => action => {

    if (action.type === PersonsActions.LOAD_MOVIE_CNC_ACTION) {

        let movieId = action.payload;

        LoadMovieCastnCrew(movieId)
            .then(responce => responce.json())
            .then(responceJson => {
                dispatch({
                    type: PersonsActions.LOAD_MOVIE_CNC,
                    payload: { movieId: movieId, data: responceJson }
                })
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: PersonsActions.LOAD_MOVIE_CNC,
                    payload: { movieId: movieId, data: false }
                })
            })
    }

    return next(action)
}


