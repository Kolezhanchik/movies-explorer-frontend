import React from 'react';
import './SearchForm.css';


function SearchForm(props) {
    return (
        
            <form className="search-form">
                <input type="text" placeholder="Фильм" className="search-form__input"/>
                <button className="search-form__btn">Найти</button>
                <label className="search-form__label">
                    <input type="checkbox" className="search-form__checkbox"/>
                    <span class="search-form__checkmark"></span>
                    Короткометражки
                </label>
                
            </form>    
    );
}

export default SearchForm;
