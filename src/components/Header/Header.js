import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    const [navMobShown, setNavMobShown] = useState(false);

    return (
        (props.location === "/" ||
            props.location === "/movies" ||
            props.location === "/saved-movies" ||
            props.location === "/profile"
        ) ?
            <header className={props.location === '/' ? 'header header_main' : 'header'} >
                <div className="header__content">
                    <Link to='/'> <img src={logo} alt="Логотип" className="header__logo" /> </Link>
                    <div 
                    onClick={() => setNavMobShown(false)}
                    className={props.isLoggedIn && (navMobShown  ? "header__navigation-mob" : "header__navigation-mob header__navigation-mob_disabled")}>
                    {props.isLoggedIn && <button 
                    onClick={() => setNavMobShown(false)} 
                    className="header__btn header__btn_close">&#10006;</button>}
                    <Navigation
                            isLoggedIn={props.isLoggedIn}
                        />
                    </div>
                    {props.isLoggedIn &&  <button 
                    onClick={() => setNavMobShown(true)} 
                    className={props.location === '/' ? "header__btn header__btn_main" : "header__btn"}>&#8801;</button>}
                </div>
            </header>
            :
            <header className="header__empty"></header>
    );
}

export default Header;