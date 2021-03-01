import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import tempCardsData from '../../utils/tempData.json';
import './Movies.css'

function Movies(props) {

    // const [tempCardsData, setTempCardsData] = useState([]);

    // function getMoviesTemp() {
    //     return fetch(`https://api.nomoreparties.co/beatfilm-movies`);        
    // }

    // getMoviesTemp()
    //     .then((res) => {
    //     if (res.ok) { return res.json(); }
    //     return Promise.reject(res.status);
    // })
    // .then((res) => {
    //    setTempCardsData(res);
    // })
    // .catch((err) => {
    //     alert(err + "str 26");
    // }); 

    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList
                tempCardsData={tempCardsData}
                // imageUrl={'https://api.nomoreparties.co'}
                imageUrl={'https://raw.githubusercontent.com/KoLenhen/movies-explorer-frontend/level-2/src/images/cards'}
            />
        </section>
    );
}

export default Movies;