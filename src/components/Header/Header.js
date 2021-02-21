import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header(props) {
let location = useLocation();
    return (
        <header className={location.pathname === '/' ? 'header header_main':'header'} >            
            <div className="header__content">
            <Link to='/'> <img src={logo} alt="Логотип" className="header__logo"/> </Link>
            <Navigation 
            isLoggedIn = {props.isLoggedIn}
            />
            </div>
        </header >
    );
}

export default Header;