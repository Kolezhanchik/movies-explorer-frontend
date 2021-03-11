import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomFormValidation } from '../../hooks/useCustomForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile(props) {
    const { values, handleChange, errors, resetForm, isValid } = useCustomFormValidation();
    const [disabled, setDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (currentUser) resetForm(currentUser);
    }, [currentUser, resetForm]);

    function handleSubmit(event) {
        event.preventDefault();
        props.handleUpdate(values);
        setEdit(false); 
        setDisabled(true);
    }

    return (
        <form className="profile-form"
            onSubmit={handleSubmit}
        >
            <h1 className="profile-form__title">Привет, {values.name}!</h1>
            <label className="profile-form__label">
                <span className="profile-form__text">Имя</span>
                <input
                    disabled={disabled}
                    minLength={2}
                    maxLength={25}
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={values.name}
                    onChange={handleChange}
                    className={errors.name ?
                        "profile-form__input profile-form__input_invalid"
                        : "profile-form__input"}
                />

            </label>
            <label className="profile-form__label">
                <span className="profile-form__text">Почта</span>
                <input
                    disabled={disabled}
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email ?
                        "profile-form__input profile-form__input_invalid"
                        : "profile-form__input"}
                />

            </label>
            {!edit ?
                <div className="profile-form__wrap">
                    <button
                        onClick={() => { setDisabled(false); setEdit(true); }}
                        className="profile-form__btn"
                    >Редактировать</button>
                    <Link
                        to="/"
                        onClick={props.handleLogout}
                        className="profile-form__link">Выйти из аккаунта</Link>
                </div>
                :
                <div className="profile-form__wrap">
                    <span
                        className={(errors.email || errors.name) ?
                            "profile-form__err-msg profile-form__err-msg_active"
                            : "profile-form__err-msg"}>{errors.email && errors.name}</span>
                    <input
                        type="submit"
                        disabled={!isValid}
                        className="profile-form__submit"
                        value="Сохранить" />
                </div>
            }
        </form>
    );
}

export default Profile;