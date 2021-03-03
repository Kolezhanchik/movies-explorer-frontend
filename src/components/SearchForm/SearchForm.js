import React from 'react';
import './SearchForm.css';


function SearchForm(props) {
    return (
        <form className="search-form">
            <input type="text" placeholder="Фильм" className="search-form__input"></input>
            <input value="Найти" type="submit" className="search-form__btn"></input>
            <label className="search-form__label search-form__label_checkbox">
                <input type="checkbox" className="search-form__checkbox" ></input>
                <span className="search-form__checkmark"></span>
                    Короткометражки
            </label>
        </form>
    );
}

export default SearchForm;
