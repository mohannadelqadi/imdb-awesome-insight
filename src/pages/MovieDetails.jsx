import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadMovieDetailsById } from './../redux/actions';
import { getImageFullPath, getOriginalImageFullPath, getLanguageByLanguageCode, getIMDBfullUrl } from './../helpers'
import { Link } from 'react-router-dom'
import MovieCastNCrew from '../components/MovieCastNCrew';

const mapMovieDetailsStateToProps = state => {
    return ({
        movieDetailsState: state.movie_details
    })
}

const mapDispatchLoadMovieDetailsToProp = dispatch => {
    return ({
        loadMovieDetailsById: movieId => dispatch(loadMovieDetailsById(movieId))
    })
}

let getSpokenLanguages = spoken_languages => {
    return (
        <ul key={'spoken-languages-container'}>
            {
                spoken_languages.map((lang, index) => {
                    return (
                        <li key={'movies-spoken-languages-' + lang.iso_639_1}>
                            {getLanguageByLanguageCode(lang.iso_639_1)}
                            {
                                (() => {
                                    if (index < spoken_languages.length - 1) {
                                        return (
                                            ' | '
                                        )
                                    }
                                })()
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

let getProductionCompanies = production_companies => {
    return (
        <div className="prod-com-container">
            {
                production_companies.map(({ id, logo_path, name }) => {
                    return (
                        <div key={'prod-company-details-list-' + id} className="prod-comp">
                            {
                                (() => {
                                    if (logo_path !== null) {
                                        return (
                                            <img src={getImageFullPath(logo_path)} alt={name} />
                                        )
                                    } else {
                                        return (
                                            <div>
                                                {name}
                                            </div>
                                        )
                                    }
                                })()
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

let getProductionCountries = production_countries => {
    return (
        <ul>
            {
                production_countries.map(({ iso_3166_1, name }, index) => {
                    return (
                        <li key={'production-countires-details-list-' + iso_3166_1}>
                            {name}
                            {
                                (() => {
                                    if (index < production_countries.length - 1) {
                                        return (
                                            ' | '
                                        )
                                    }
                                })()
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

let getMovieCollections = belongs_to_collection => {
    if (!!belongs_to_collection && belongs_to_collection !== null) {
        let { id, name, poster_path, backdrop_path } = belongs_to_collection

        let bgStyle = {};

        if (!!backdrop_path && backdrop_path !== null) {
            bgStyle['backgroundImage'] = `url(${getOriginalImageFullPath(backdrop_path)})`
        }

        return (
            <div className="collection-holder" style={bgStyle}>
                <div className="collection-item">

                    {
                        (() => {
                            if (!!poster_path && poster_path !== null) {
                                return (
                                    <Link to={'/'}>
                                        <img src={getImageFullPath(poster_path)} alt={name} />
                                    </Link>
                                )
                            }
                            return null;
                        })()
                    }
                    <Link to={'/'}>
                        <h2>See other movies on {name}</h2>
                    </Link>
                </div>
            </div>
        )
    }
    return null;
}

let getGenersList = genres => {
    return (
        <ul className="geners" key={'geners-list-container'}>
            {
                genres.map(({ id, name }, index) => {
                    return (
                        <li key={'geners-list-details-' + id}>
                            {name}
                            {
                                (() => {
                                    if (index < genres.length - 1) {
                                        return (
                                            ' | '
                                        )
                                    }
                                })()
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

let getMovieWebsiteLink = homepage => {
    if (!!homepage && homepage !== null) {
        return (
            <div className="website-link-holder">
                <a href={homepage} target="_blank" rel="noopener noreferrer">
                    <img src={'assets/images/website-icon.png'} />
                </a>
            </div>
        )
    }
    return null;
}

let getMovieIMDBLink = imdb_id => {
    if (!!imdb_id && imdb_id !== null) {
        return (
            <div className="imbd-link-holder">
                <a href={getIMDBfullUrl(imdb_id)} target="_blank" rel="noopener noreferrer">
                    <img src={'assets/images/imdbpngfile.png'} />
                </a>
            </div>
        )
    }
    return null;
}


let stripYearFromDate = release_date => release_date.split('-')[0];

let setDocumentTitle = movieTitle => {
    let documentTitle = 'Please wait ...';
    if (!!movieTitle && movieTitle !== null) {
        documentTitle = movieTitle;
    }
    document.title = documentTitle;
}

const drawMovieDetails = ({ id, title, overview, backdrop_path, poster_path, release_date, spoken_languages,
    production_companies, production_countries, belongs_to_collection, genres, homepage, imdb_id, runtime, vote_average }) => {

    let movieBackgroudImage = getOriginalImageFullPath(backdrop_path),
        posterPath = getImageFullPath(poster_path),
        movieTitle = `${title} (${stripYearFromDate(release_date)})`;

    setDocumentTitle(movieTitle);

    return (
        <article className="movie-details-container" style={{ backgroundImage: `url(${movieBackgroudImage})` }}>

            <div className="movie-details-parent">
                <div className="content-container">
                    <div>
                        <img className="movie-poster" src={posterPath} alt={title} />
                    </div>
                    <div className="content">
                        <h2>{movieTitle}</h2>
                        {
                            getGenersList(genres)
                        }
                        <div className="rating-container">
                            IMDB&nbsp;<div className="rating">{vote_average}</div>
                        </div>
                        {
                            (() => {
                                if (!!runtime && runtime !== null && runtime > 0) {
                                    return (
                                        <div className="duration-container">
                                            Duration:&nbsp;<div>({runtime})</div>&nbsp;minutes
                                    </div>
                                    )
                                }
                                return null;
                            })()
                        }

                        <div className="links-holder">
                            {
                                (() => {
                                    if (!!imdb_id && imdb_id !== null) {
                                        return getMovieIMDBLink(imdb_id);
                                    }
                                    return null;
                                })()
                            }
                            {
                                (() => {
                                    if (!!homepage && homepage !== null) {
                                        return getMovieWebsiteLink(homepage);
                                    }
                                    return null;
                                })()
                            }
                        </div>


                        {
                            (() => {
                                if (!!spoken_languages && spoken_languages !== null) {
                                    return (
                                        <div className="languages-container">
                                            <span className="title">Spoken languages:&nbsp;</span>
                                            {
                                                getSpokenLanguages(spoken_languages)
                                            }
                                        </div>
                                    )
                                }
                                return null;
                            })()
                        }


                        {
                            (() => {
                                if (!!production_countries && production_countries !== null) {
                                    return (
                                        <div className="countries-container">
                                            <span className="title">Production countries:&nbsp;</span>
                                            {
                                                getProductionCountries(production_countries)
                                            }
                                        </div>
                                    )
                                }
                                return null;
                            })()
                        }


                        <p>
                            {overview}
                        </p>
                        {
                            getProductionCompanies(production_companies)
                        }


                    </div>
                </div>
                <MovieCastNCrew movieId={id}></MovieCastNCrew>
            </div>


            {
                getMovieCollections(belongs_to_collection)
            }
        </article>
    )
}

const MovieDetails = ({ movieDetailsState, loadMovieDetailsById, match }) => {

    const [movieDetails, setMovieDetails] = useState(null);
    let movieId = match.params.movieId;

    useEffect(() => {

        let movieDetailsFilter = movieDetailsState.filter(mv => {
            return mv.movieId === movieId
        });

        if (movieDetailsFilter !== null && movieDetailsFilter.length > 0) {
            setMovieDetails(movieDetailsFilter[0].data)
        } else {
            console.log(`Loading movie ID ${movieId} from the API`);
            loadMovieDetailsById(movieId);
        }
    }, [movieDetailsState]);


    setDocumentTitle(null);

    if (movieDetails !== null) {
        if (movieDetails !== false) {
            return drawMovieDetails(movieDetails);
        }
        return (
            <div>
                <p>Something went wrong, please try again later!!</p>
            </div>
        )
    }
    return (
        <div>
            <p>Loading, please wait ...</p>
        </div>
    )

}

export default connect(mapMovieDetailsStateToProps, mapDispatchLoadMovieDetailsToProp)(MovieDetails);