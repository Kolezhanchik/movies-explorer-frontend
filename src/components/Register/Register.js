import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useCustomFormValidation } from '../../hooks/useCustomForm';
import './Register.css';

function Register(props) {
    const { values, handleChange, errors, isValid, resetForm } = useCustomFormValidation();

    function handleSubmit(event) {
        event.preventDefault();
        props.handleRegister(values);
        resetForm();
    }

    return (
        <form
            className="registration-form"
            onSubmit={handleSubmit}
            noValidate
        >
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
                    value={values.name || ''}
                    onChange={handleChange}
                    className={errors.name ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={errors.name ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{errors.name}</span>
            </label>
            <label className="registration-form__label">
                E-mail
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={errors.email ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{errors.email}</span>
            </label>
            <label className="registration-form__label">
                Пароль
                <input
                    minLength={6}
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    className={errors.password ?
                        "registration-form__input registration-form__input_invalid"
                        : "registration-form__input"}
                />
                <span
                    className={errors.password ?
                        "registration-form__err-msg registration-form__err-msg_active"
                        : "registration-form__err-msg"}>{errors.password}</span>
            </label>
            <div className="registration-form__wrap">
                <input
                    type="submit"
                    disabled={!isValid}
                    className="registration-form__submit" value="Зарегистрироваться"
                />
                <span className="registration-form__text">Уже зарегистрированы?&nbsp;<Link to="/sign-in" className="registration-form__link">Войти</Link></span>
            </div>
        </form>
    );
}

export default Register;