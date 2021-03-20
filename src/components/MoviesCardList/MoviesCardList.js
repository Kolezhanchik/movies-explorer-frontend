import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList(props) {
    const [count, setCount] = useState(12);
    const [countAdd, setCountAdd] = useState(3);
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            if (windowWidth < 1020 && windowWidth > 690) {
                setCount(8);
                setCountAdd(2);
            }
            (windowWidth < 690)&&setCount(5);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);
    
    return (
        <section className="movies-list">
            <div className="movies-list__cards">
                {
                    props.cardsData.slice(0, count).map((item) => {
                        return (
                            <MoviesCard
                                key={item.id || item.movieId}
                                data={item}
                                image={!!props.imageUrl ? props.imageUrl.concat(item.image.url) : item.image}
                                likeMovieHandler={props.likeMovieHandler}
                                dislikeMovieHandler={props.dislikeMovieHandler}
                                handleDelMovie={props.handleDelMovie}
                            />
                        )
                    })

                }
            </div>
            {props.cardsData.length > count && <button onClick={() => setCount(count + countAdd)} className="movies-list__btn">Ещё</button>}
        </section>
    );
}

export default MoviesCardList;


