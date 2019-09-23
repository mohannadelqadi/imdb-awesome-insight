import { AppConfig } from './../config';
import { languagesCodes } from './iso_language_codes';

export const getImageFullPath = image => AppConfig.ImagesBasePath + image;

export const getOriginalImageFullPath = image => AppConfig.originalImagesBasePath + image;

export const getIMDBfullUrl = imdb_id => AppConfig.IMDBtitleBasePath + imdb_id;

export const getLanguageByLanguageCode = languageCode => {
    let langs = languagesCodes.filter(lang =>{
        return lang.code === languageCode;
    });
    return langs.length > 0 ? langs[0].name : 'NA';
}

export const urlsHelper = {
    Homepage: () => '/',
    VodDetails: vodId => `/movie/${vodId}`
}

export const putApiKey = apiUrl => apiUrl.replace('{API_KEY}', AppConfig.ApiKey);