import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import tempCardsData from '../../utils/tempData.json';
import './Movies.css'

function Movies(props) {

    const [cards, setCards] = useState([]);
    const [cardList, setCardsList] = useState([]);

    useEffect(() => {
        props.api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((error) => { alert(error) })
            .finally(() => {

            });

    }, [props.api])

    function handleSubmit(keyWord, isShort) {
        setCardsList(props.handleSearch(cards, keyWord, isShort));
    }

    return (
        <section className="movies">
            <SearchForm
                handleSearch={handleSubmit}
            />
            <MoviesCardList
                likeMovieHandler={props.likeMovieHandler}
                dislikeMovieHandler={props.dislikeMovieHandler}
                cardsData={cardList}
                imageUrl={'https://api.nomoreparties.co'}
            />
        </section>
    );
}

export default Movies;