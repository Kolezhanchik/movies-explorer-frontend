import React, { useEffect, useContext, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import mainApi from '../../utils/MainApi';
import './SavedMovies.css';

function SavedMovies(props) {
    const currentUser = useContext(CurrentUserContext);
    const [cardList, setCardsList] = useState(currentUser.savedMoviesCards);

    function handleSubmit(keyWord, isShort) {
        setCardsList(props.handleSearch(currentUser.savedMoviesCards, keyWord, isShort));
    }

    // function handleDelMovie(movieId) {
    //     props.setCurrentUser({
    //         ...currentUser,
    //         savedMoviesCards: currentUser.savedMoviesCards.filter((item) => item.movieId !== movieId && item.owner === currentUser.id),
    //     });
    // }

    useEffect(() => {
        setCardsList(currentUser.savedMoviesCards);
    }, [currentUser.savedMoviesCards])

    return (
        <section className="movies">
            <SearchForm
                handleSearch={handleSubmit}
            />
            <MoviesCardList
                cardsData={cardList}
                dislikeMovieHandler={props.dislikeMovieHandler}
                // handleDelMovie={handleDelMovie}
            />
        </section>
    );
}

export default SavedMovies;