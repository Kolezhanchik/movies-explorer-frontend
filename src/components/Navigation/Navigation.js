import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './Navigation.css'

function Navigation(props) {
    let location = useLocation();
    return (
        props.isLoggedIn ?
            <nav className="navigation navigation-mob">
                <NavLink to="/"
                    className="navigation__link navigation__link_mob navigation__link_main-mob">Главная</NavLink>
                <NavLink to="/movies"
                    activeClassName="navigation__link_active"
                    className={location.pathname === '/' ? 'navigation__link_mob navigation__link navigation__link_main' : 'navigation__link_mob navigation__link'}>Фильмы</NavLink>
                <NavLink to="/saved-movies"
                    activeClassName="navigation__link_active"
                    className={location.pathname === '/' ? 'navigation__link_mob navigation__link navigation__link_main' : 'navigation__link_mob navigation__link'}>Сохранённые фильмы</NavLink>
                <NavLink to="/profile"
                    className={location.pathname === '/' ?
                        'navigation__link navigation__link_profile-main navigation__link_profile-main-mob' :
                        'navigation__link navigation__link_profile navigation__link_profile-mob'}>Аккаунт</NavLink>
            </nav> :
            <nav className="navigation">
                <NavLink to="/sign-up"
                    className={location.pathname === '/' ? 'navigation__link navigation__link_main' : 'navigation__link'}>Регистрация</NavLink>
                <NavLink to="/sign-in"
                    className='navigation__link navigation__link_signin'>Войти</NavLink>
            </nav>);
}

export default Navigation;

