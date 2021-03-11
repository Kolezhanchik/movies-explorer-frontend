import React, { useState } from 'react';
import './SearchForm.css';


function SearchForm(props) {

    const [keyWord, setKeyWord] = useState('');
    const [isShort, setIsShort] = useState(false);

    function handleChange(event) {
        event.preventDefault();
        const value = event.target.value;
        setKeyWord(value.toLowerCase());
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.handleSearch(keyWord, isShort);
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Фильм"
                onChange={handleChange}
                className="search-form__input"
            />
            <input
                value="Найти"
                type="submit"
                className="search-form__btn"
            />
            <label className="search-form__label search-form__label_checkbox">
                <input
                    type="checkbox"
                    className="search-form__checkbox"
                    onChange={() => { setIsShort(!isShort) }}
                />
                <span className="search-form__checkmark"></span>
                    Короткометражки
            </label>
        </form>
    );
}

export default SearchForm;
