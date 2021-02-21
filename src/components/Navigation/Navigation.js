import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './Navigation.css'

function Navigation(props) {
    let location = useLocation();
    return (
        props.isLoggedIn ?
            <nav className="navigation">
                <NavLink to="/movies"
                    activeClassName="navigation__link_active"
                    className={location.pathname === '/' ? 'navigation__link navigation__link_main' : 'navigation__link'}>Фильмы</NavLink>
                <NavLink to="/save-movies"
                    activeClassName="navigation__link_active"
                    className={location.pathname === '/' ? 'navigation__link navigation__link_main' : 'navigation__link'}>Сохранённые фильмы</NavLink>
                <NavLink to="/profile"
                    className={location.pathname === '/' ? 
                    'navigation__link navigation__link_profile-main' : 
                    'navigation__link navigation__link_profile'}>Аккаунт</NavLink>
            </nav> :
            <nav className="navigation">
                <NavLink to="/sign-up"
                    className={location.pathname === '/' ? 'navigation__link navigation__link_main' : 'navigation__link'}>Регистрация</NavLink>
                <NavLink to="/sign-in"
                    className='navigation__link navigation__link_signin'>Войти</NavLink>
            </nav>    );
}

export default Navigation;

