import { AppConfig } from './../config';
import {putApiKey} from './../helpers';

/**
 * Get the list of the movies from date to date
 * @param {*} FromDate Start date
 * @param {*} ToDate End date
 */
export const getMoviesFromDateToDate = (FromDate, ToDate) => {
    let apiUrl = AppConfig.ApiBaseURL + AppConfig.ApisURLs.MoviesFromDateToDate.replace('{FROM}', FromDate).replace('{TO}', ToDate);
    apiUrl = putApiKey(apiUrl);
    return fetch(apiUrl);
}

/**
 * Get the movie/series details 
 * @param {*} movieId Movie ID
 */
export const getMovieById = movieId => {
    let apiUrl = AppConfig.ApiBaseURL + AppConfig.ApisURLs.MovieDetails.replace('{MOVIE_ID}', movieId);
    apiUrl = putApiKey(apiUrl);
    return fetch(apiUrl);
}