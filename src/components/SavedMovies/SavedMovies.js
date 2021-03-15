import React, { useContext, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ErrorsModal from "../ErrorsModal/ErrorsModal";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedMovies.css';

function SavedMovies(props) {
    const currentUser = useContext(CurrentUserContext);
    const [cardList, setCardsList] = useState([]);
    const [savedMovieEerorMessage, setSavedMovieEerorMessage] = useState('');
    const [savedMovieType, setSavedMovieType] = useState(false);
    const [savedMovieIsOpen, setSavedMovieIsOpen] = useState(false);

    function handleSubmit(keyWord, isShort) {
        const found = props.handleSearch(currentUser.savedMoviesCards, keyWord, isShort);
        setCardsList(found);
        if (found < 1) {
            setSavedMovieIsOpen(true);
            setSavedMovieType(false);
            setSavedMovieEerorMessage('Ничего не найдено');
        }
    }

    function handleDelMovie(data) {
        props.dislikeMovieHandler(data);
        setCardsList(currentUser.savedMoviesCards.filter((item) => item.movieId !== data.movieId));
    }

    return (
        props.isPreloader ? <Preloader /> :
            <section className="movies-saved">
                <SearchForm
                    handleSearch={handleSubmit}
                    lastKeyWord={props.lastKeyWord}
                />
                {savedMovieIsOpen ? <ErrorsModal
                    isOpen={savedMovieIsOpen || props.isOpen}
                    errorMessage={savedMovieEerorMessage || props.errorMessage}
                    type={savedMovieType || props.type}
                    setIsOpen={setSavedMovieIsOpen || props.setIsOpen}
                />
                    :
                    <MoviesCardList
                        cardsData={cardList}
                        dislikeMovieHandler={handleDelMovie}
                    />}
            </section>
    );
}

export default SavedMovies;