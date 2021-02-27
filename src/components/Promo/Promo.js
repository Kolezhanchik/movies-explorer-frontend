import React, { useState } from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
    const [isShown, setIsShown] = useState(false);
    // const handleClick = () => {
    //     setisShown(!isShown);
    // }
    return (
        <section className="promo">
            <div className="promo__wrap">
            <div className="promo__text-wrap">
                <h1 className="promo__title">
                    Учебный проект студента факультета Веб&#8209;разработки.
                </h1>
                <p className="promo__text">
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
            </div>
            <button className="promo__btn" onClick={() => setIsShown(!isShown)}>Узнать больше
            <NavTab 
            isShown={isShown} 
            handleClick = {setIsShown}
            />
            </button>
            
            </div>
        </section>
    );
}

export default Promo;