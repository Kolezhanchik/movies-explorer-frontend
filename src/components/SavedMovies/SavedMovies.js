import React, { useEffect, useContext, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedMovies.css';

function SavedMovies(props) {
    const currentUser = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);
    const [cardList, setCardsList] = useState([]);

    
    useEffect(() => {
        props.api.getInitialCards('movies')
            .then((res) => {
                setCards(res);
            })
            .catch((error) => { alert(error) })
            .finally(() => {

            });

    }, [props.api])

    function handleSubmit(keyWord, isShort) {  
        setCardsList(props.handleSearch(
            cards.filter((item) => item.owner===currentUser.id), keyWord, isShort));
    }

    function handleDelMovie(movieId) {  
        setCardsList(cards.filter((item) => item.movieId !== movieId && item.owner===currentUser.id));
    }

    return (
        <section className="movies">
            <SearchForm
                handleSearch = {handleSubmit}
            />
            <MoviesCardList
                cardsData = {cardList}
                dislikeMovieHandler = {props.dislikeMovieHandler}
                handleDelMovie = {handleDelMovie}
            />
        </section>
    );
}

export default SavedMovies;