import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const [mailErrorMessage, setMailErrorMessage] = useState('');


    return (
        <form className="login-form" noValidate>
            <Link to='/'> <img src={logo} alt="Логотип" className="login-form__logo" /> </Link>
            <h1 className="login-form__title">Рады видеть!</h1>  
            <label className="login-form__label">
                E-mail
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setMailErrorMessage(e.target.validationMessage); }}
                    className="login-form__input"
                />
                <span
                    className={mailErrorMessage ?
                        "login-form__err-msg login-form__err-msg_active"
                        : "login-form__err-msg"}>{mailErrorMessage}</span>
            </label>            
            <label className="login-form__label">
                Пароль
                <input
                    minLength={2}
                    maxLength={8}
                    type="password"
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPassErrorMessage(e.target.validationMessage) }}
                    className="login-form__input"
                />
                <span
                    className={passErrorMessage ?
                        "login-form__err-msg login-form__err-msg_active"
                        : "login-form__err-msg"}>{passErrorMessage}</span>
            </label>
            <div className="login-form__wrap">
                <input type="submit"
                    disabled={(passErrorMessage || mailErrorMessage)
                        || !(email && password)}
                    className="login-form__submit" value="Войти"
                />
                <span className="login-form__text">Ещё не зарегистрированы?&nbsp;<Link to="/sign-up" className="login-form__link">Регистрация</Link></span>
            </div>
        </form>
    );
}

export default Login;