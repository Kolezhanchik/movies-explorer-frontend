import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';


function MoviesCard(props) {
    const currentUser = useContext(CurrentUserContext);
    const [isLiked, setIsLiked] = useState(
        currentUser.savedMoviesCards.findIndex(item => item.movieId === props.data.id) > -1);
    const location = useLocation();

    function handleLikeClick() {        
        props.likeMovieHandler(props.data);
        setIsLiked(true);
    }

    function handleDisLikeClick() {
        setIsLiked(false);
        props.dislikeMovieHandler(props.data);
    }

    return (
        <div className="movies-card">
            <a 
            target="_blank" 
            rel="noreferrer" 
            href={props.data.trailerLink||props.data.trailer}
            className="movies-card__trailer"
            >
                <img className="movies-card__image" src={props.image} alt={props.data.nameRU} />
                </a>               
            <div className="movies-card__wrap">
                <p className="movies-card__name">{props.data.nameRU} </p>
                {location.pathname === '/movies' ?
                    (isLiked ?
                        <button onClick={handleDisLikeClick}
                            className={"movies-card__like movies-card__liked"}>
                            &#9829;
                        </button>
                        :
                        <button
                            onClick={handleLikeClick}
                            className={"movies-card__like movies-card__not-liked"}>
                            &#9825;
                        </button>)
                    :
                    <button
                        onClick={handleDisLikeClick}
                        className={"movies-card__like movies-card__unlike"}>

                    </button>
                }
            </div>
            <p className="movies-card__duration">
                {Math.trunc(props.data.duration / 60)}ч&nbsp;{props.data.duration % 60}м
                </p>
        </div>
    );
}

export default MoviesCard;