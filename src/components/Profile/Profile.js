import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [disabled, setDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [mailErrorMessage, setMailErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');

    return (
        <form className="profile-form">
            <h1 className="profile-form__title">Привет, {props.name}!</h1>
            <label className="profile-form__label">
                <span className="profile-form__text">Имя</span>
                <input
                    disabled={disabled}
                    minLength={2}
                    maxLength={25}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameErrorMessage(e.target.validationMessage) }}
                    className={nameErrorMessage ?
                        "profile-form__input profile-form__input_invalid"
                        : "profile-form__input"}
                />
                <span
                    className={nameErrorMessage ?
                        "profile-form__err-msg profile-form__err-msg_active"
                        : "profile-form__err-msg"}>{nameErrorMessage}</span>
            </label>
            <label className="profile-form__label">
                <span className="profile-form__text">Почта</span>
                <input
                    disabled={disabled}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setMailErrorMessage(e.target.validationMessage); }}
                    className={mailErrorMessage ?
                        "profile-form__input profile-form__input_invalid"
                        : "profile-form__input"}
                />
                <span
                    className={mailErrorMessage ?
                        "profile-form__err-msg profile-form__err-msg_active"
                        : "profile-form__err-msg"}>{mailErrorMessage}</span>
            </label>
            {!edit ?
                <div className="profile-form__wrap">
                    <button
                        onClick={() => { setDisabled(false); setEdit(true); }}
                        className="profile-form__btn"
                    >Редактировать</button>
                    <Link
                        to="/"
                        onClick={() => props.setIsLoggedIn(false)}
                        className="profile-form__link">Выйти из аккаунта</Link>
                </div>
                :
                <input
                    type="submit"
                    disabled={(mailErrorMessage || nameErrorMessage)}
                    className="profile-form__submit"
                    value="Сохранить" />
            }
        </form>
    );
}

export default Profile;