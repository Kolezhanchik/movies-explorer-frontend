import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


function MoviesCard(props) {
    const [isLiked, setIsLiked] = useState(false);
    const location = useLocation();
    
   
    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.image} alt={props.name} />
            <div className="movies-card__wrap">
                <p className="movies-card__name">{props.name} </p>
                {location.pathname === '/movies' ? (isLiked ?
                    <button onClick={() => setIsLiked(!isLiked)} className={"movies-card__like movies-card__liked"}>
                        &#9829;
                </button>
                    :
                    <button onClick={() => setIsLiked(!isLiked)} className={"movies-card__like movies-card__not-liked"}>
                        &#9825;
                </button>) : <button onClick={() => setIsLiked(!isLiked)} className={"movies-card__like movies-card__unlike"}>
                        &#9932;
                </button>
                }
            </div>
            <p className="movies-card__duration">{Math.trunc(props.duration / 60)}ч&nbsp;{props.duration % 60}м</p>
        </div>
    );
}

export default MoviesCard;