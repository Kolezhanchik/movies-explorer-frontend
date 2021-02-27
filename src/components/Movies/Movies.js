//https://api.nomoreparties.co/beatfilm-movies
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import tempCardsData from '../../utils/tempData.json';
import './Movies.css'

function Movies(props) {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList
                tempCardsData={tempCardsData}
            />
        </section>
    );
}

export default Movies;