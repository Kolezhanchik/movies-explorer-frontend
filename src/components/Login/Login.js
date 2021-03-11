import React from 'react';
import logo from '../../images/logo.svg';
import {useCustomFormValidation} from '../../hooks/useCustomForm';
import { Link } from 'react-router-dom';
import './Login.css';

function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useCustomFormValidation();

    function handleSubmit(event){
        event.preventDefault(event);
        props.handleLogin(values);
        resetForm();
    }

    return (
        <form 
        className="login-form" 
        onSubmit = {handleSubmit}
        noValidate
        >
            <Link to='/'> <img src={logo} alt="Логотип" className="login-form__logo" /> </Link>
            <h1 className="login-form__title">Рады видеть!</h1>  
            <label className="login-form__label">
                E-mail
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email ?
                        "login-form__input login-form__input_invalid"
                        : "login-form__input"}
                />
                <span
                    className={errors.email ?
                        "login-form__err-msg login-form__err-msg_active"
                        : "login-form__err-msg"}>{errors.email}</span>
            </label>            
            <label className="login-form__label">
                Пароль
                <input
                    minLength={2}
                    maxLength={8}
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    className={errors.password ?
                        "login-form__input login-form__input_invalid"
                        : "login-form__input"}
                />
                <span
                    className={errors.password  ?
                        "login-form__err-msg login-form__err-msg_active"
                        : "login-form__err-msg"}>{errors.password}</span>
            </label>
            <div className="login-form__wrap">
                <input type="submit"
                    disabled={!isValid}
                    className="login-form__submit" value="Войти"
                />
                <span className="login-form__text">Ещё не зарегистрированы?&nbsp;<Link to="/sign-up" className="login-form__link">Регистрация</Link></span>
            </div>
        </form>
    );
}

export default Login;