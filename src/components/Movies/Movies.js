import React, { useEffect, useState, useCallback } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ErrorsModal from "../ErrorsModal/ErrorsModal";
import moviesApi from '../../utils/MoviesApi';
import Preloader from "../Preloader/Preloader";
import './Movies.css'

function Movies(props) {

    const [cards, setCards] = useState([]);
    const [cardList, setCardsList] = useState([]);
    const [localPreloader, setLocalPreloader] = useState(false);
    const [errorMoviesMessage, setMoviesErrorMessage] = useState('');
    const [typeMovies, setTypeMovies] = useState(false);
    const [isOpenMovies, setIsOpenMovies] = useState(false);

    useEffect(() => {
        setLocalPreloader(true);
        moviesApi.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((error) => {
                console.log(error);
                setIsOpenMovies(true);
                setTypeMovies(false);
                setMoviesErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
            .finally(() => {
                setLocalPreloader(false);
            });

    }, [])

    function handleSubmit(keyWord, isShort) {
        const found = props.handleSearch(cards, keyWord, isShort);
        setCardsList(found);
        if (found < 1) {
            setIsOpenMovies(true);
            setTypeMovies(false);
            setMoviesErrorMessage('Ничего не найдено');
        }
    }

    return (
        <section className="movies">
            <SearchForm
                handleSearch={handleSubmit}
                lastKeyWord={props.lastKeyWord}
            />
            {localPreloader ? <Preloader />
                :
                isOpenMovies ? <ErrorsModal
                    isOpen={isOpenMovies}
                    errorMessage={errorMoviesMessage}
                    type={typeMovies}
                    setIsOpen={setIsOpenMovies}
                />
                    :
                    <MoviesCardList
                        likeMovieHandler={props.likeMovieHandler}
                        dislikeMovieHandler={props.dislikeMovieHandler}
                        cardsData={cardList}
                        imageUrl={'https://api.nomoreparties.co'}
                    />}
        </section>
    );
}

export default Movies;