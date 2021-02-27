import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';


function PageNotFound(props) {
    const history = useHistory();
    return (
        <section className="page-not-found">
            <div className="page-not-found__wrap">
                <span className="page-not-found__num">404</span>
                <p className="page-not-found__text">Страница не найдена</p>
            </div>
            <button onClick={() => history.goBack()} className="page-not-found__btn">Назад</button>
        </section>
    );
}

export default PageNotFound;
