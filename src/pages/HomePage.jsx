import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadLatestMovies } from './../redux/actions';
import { getImageFullPath, urlsHelper } from './../helpers';
import { Link } from 'react-router-dom';

const mapLatestMoviesStateToProps = state => {
    return {
        homePageLatestMovies: state.latest_movies
    }
}

const mapLoadLatestMoviesToProps = dispatch => {
    return {
        loadLatestMovies: () => dispatch(loadLatestMovies())
    }
}

const HomePage = ({ homePageLatestMovies, loadLatestMovies }) => {

    useEffect(() => {
        if (homePageLatestMovies === null) {
            loadLatestMovies();
        }
    }, [homePageLatestMovies, loadLatestMovies])

    const getHomepageVodCard = ({ id, poster_path }) => {
        return (
            <div className="homepage-vod-card" key={'home-page-card-' + id}>
                <Link to={urlsHelper.VodDetails(id)}>
                    <img src={getImageFullPath(poster_path)} />
                </Link>
            </div>
        )
    }

    if (homePageLatestMovies !== null) {
        let { results } = homePageLatestMovies;
        if (results !== null && !!results) {
            return (
                <section className="homepage-main-vods-holder">
                    {
                        results.map(result => getHomepageVodCard(result))
                    }
                </section>
            )
        } else {
            return (
                <div>
                    <p>Something went wrong, please try again later!!</p>
                </div>
            )
        }
    } else {
        return (
            <div>
                <p>Loading, please wait ...</p>
            </div>
        )
    }
}


export default connect(mapLatestMoviesStateToProps, mapLoadLatestMoviesToProps)(HomePage);
