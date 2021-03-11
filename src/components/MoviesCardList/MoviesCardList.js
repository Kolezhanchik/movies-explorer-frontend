import React, {  useState } from 'react';
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
                    props.cardsData.slice(0, count).map((item) => {                        
                        return (                            
                            <MoviesCard
                                key={item.id}
                                data = {item}
                                image={!!props.imageUrl ? props.imageUrl.concat(item.image.url): item.image}
                                likeMovieHandler={props.likeMovieHandler}
                                dislikeMovieHandler={props.dislikeMovieHandler}
                                handleDelMovie = {props.handleDelMovie}
                            />
                        )
                    })

                }
            </div>
            {props.cardsData.length > count && <button onClick={() => setCount(count + 6)} className="movies-list__btn">Ещё</button>}
        </section>
    );
}

export default MoviesCardList;


