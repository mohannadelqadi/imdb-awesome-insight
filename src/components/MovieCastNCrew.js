import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getImageFullPath } from './../helpers';
import { Link } from 'react-router-dom';

const mapCastnCrewStateToProps = state => {
    return {
        castNCrew: state.movie_cast_n_crew
    }
}

const DrawCastList = ({ cast }) => {

    return cast.map(({ id, name, profile_path, credit_id }) => {
        if (!!profile_path && profile_path !== null) {
            return (

                <div className="cast-card" key={`movie-details-cast-list-${id}-${credit_id}`}>
                    <Link to={'/'}>
                        <img src={getImageFullPath(profile_path)} alt={name} />
                        <div className="cast-title">
                            {name}
                        </div>
                    </Link>
                </div>
            )
        }
        return null;
    })
}

const MovieCastNCrew = ({ castNCrew, movieId }) => {

    const [moviePersons, setMoviePersons] = useState(null);

    useEffect(() => {

        let statePersonsList = castNCrew.filter(cnc => {
            return parseInt(cnc.movieId) === parseInt(movieId);
        });

        if (statePersonsList.length > 0) {
            setMoviePersons(statePersonsList[0].data);
        }

    }, [castNCrew])

    console.log(moviePersons);

    if (moviePersons === null) {
        return null;
    }

    return (
        <div className="cast-section">
            <h2>Cast</h2>
            <div className="cast-holder">
                {
                    DrawCastList(moviePersons)
                }
            </div>
        </div>
    )
}

export default connect(mapCastnCrewStateToProps, null)(MovieCastNCrew)