import { AppConfig } from './../config';
import { putApiKey } from './../helpers';

export const LoadMovieCastnCrew = movieId => {
    let apiUrl = AppConfig.ApiBaseURL + AppConfig.ApisURLs.MovieCastnCrew.replace('{MOVIE_ID}', movieId);
    apiUrl = putApiKey(apiUrl);
    return fetch(apiUrl);
}