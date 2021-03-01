import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';


function MoviesCardList(props) {
    const [count, setCount] = useState(12);

    return (
        <section className="movies-list">
            {/* <Preloader/> || */}
            <div className="movies-list__cards">
                {
                    props.tempCardsData.slice(0, count).map((item) => {
                        return (
                            <MoviesCard
                                key={item.id}
                                name={item.nameRU}
                                // image={`https://api.nomoreparties.co${item.image.url}`}
                                image={props.imageUrl.concat(item.image.url)}
                                duration={item.duration}
                            />
                        )
                    })

                }
            </div>
            {props.tempCardsData.length > count && <button onClick={() => setCount(count + 6)} className="movies-list__btn">Ещё</button>}
        </section>
    );
}

export default MoviesCardList;


