import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


function MoviesCard(props) {

    const [isLiked, setIsLiked] = useState(false);
    const location = useLocation();

    function handleLikeClick(){
        console.log('str like');
        setIsLiked(true);
        props.likeMovieHandler(props.data);
    }

    function handleDisLikeClick(){
        setIsLiked(false);
        props.dislikeMovieHandler(props.data);
        props.handleDelMovie(props.data.movieId);
    }

    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.image} alt={props.data.nameRU} />
            <div className="movies-card__wrap">
                <p className="movies-card__name">{props.data.nameRU} </p>
                {location.pathname === '/movies' ? (isLiked ?
                    <button onClick={handleDisLikeClick}
                        className={"movies-card__like movies-card__liked"}>
                        &#9829;
                </button>
                    :
                    <button
                        onClick={handleLikeClick}
                        className={"movies-card__like movies-card__not-liked"}>
                        &#9825;
                </button>) : <button
                        onClick={handleDisLikeClick}
                        className={"movies-card__like movies-card__unlike"}>
                        
                </button>
                }
            </div>
            <p className="movies-card__duration">{Math.trunc(props.data.duration / 60)}ч&nbsp;{props.data.duration % 60}м</p>
        </div>
    );
}

export default MoviesCard;