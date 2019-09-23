export const AppConfig = {
    ApiBaseURL: 'https://api.themoviedb.org/3/',
    ApiKey: '0d24bb45443026590b898587853388a4',
    ImagesBasePath: 'https://image.tmdb.org/t/p/w500/',
    originalImagesBasePath: 'https://image.tmdb.org/t/p/original/',
    IMDBtitleBasePath: 'https://www.imdb.com/title/',
    ApisURLs: {
        MoviesFromDateToDate: 'discover/movie?api_key={API_KEY}&primary_release_date.gte={FROM}&primary_release_date.lte={TO}',
        MovieDetails: 'movie/{MOVIE_ID}?api_key={API_KEY}',
        MovieCastnCrew: 'movie/{MOVIE_ID}/credits?api_key={API_KEY}'
    }
}