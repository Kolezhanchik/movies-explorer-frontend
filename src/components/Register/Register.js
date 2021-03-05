import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { Link, Redirect } from 'react-router-dom';
import './Register.css';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailErrorMessage, setMailErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');


    return (
        <form className="registration-form" noValidate>
            <Link to='/'> <img src={logo} alt="Логотип" className="registration-form__logo" /> </Link>
            <h1 className="registration-form__title">Добро пожаловать!</h1>
            <label className="registration-form__label">
                Имя
                <input
                    minLength={2}
                    maxLength={25}
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameErrorMessage(e.target.validationMessage) }}
                    className={nameErrorMessage ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={nameErrorMessage ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{nameErrorMessage}</span>
            </label>
            <label className="registration-form__label">
                E-mail
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setMailErrorMessage(e.target.validationMessage); }}
                    className={mailErrorMessage ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={mailErrorMessage ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{mailErrorMessage}</span>
            </label>
            <label className="registration-form__label">
                Пароль
                <input
                    minLength={2}
                    maxLength={8}
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPassErrorMessage(e.target.validationMessage) }}
                    className={passErrorMessage ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={passErrorMessage ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{passErrorMessage}</span>
            </label>
            <div className="registration-form__wrap">
                <input type="submit"
                    disabled={(passErrorMessage || mailErrorMessage || nameErrorMessage)
                        || !(name && email && password)}
                    className="registration-form__submit" value="Зарегистрироваться"
                />
                <span className="registration-form__text">Уже зарегистрированы?&nbsp;<Link to="/sign-in" className="registration-form__link">Войти</Link></span>
            </div>
        </form>
    );
}

export default Register;