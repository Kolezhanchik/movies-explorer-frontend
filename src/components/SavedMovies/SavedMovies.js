import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import tempCardsData from '../../utils/tempSavedData.json';
import './SavedMovies.css'

function SavedMovies(props) {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList
                tempCardsData={tempCardsData}
                imageUrl={''}
            />
        </section>
    );
}

export default SavedMovies;