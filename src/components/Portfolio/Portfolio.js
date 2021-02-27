import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <section id="Portfolio" className="portfolio" >
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__links">
                    <li className="portfolio__item">
                        <a target="_blank" rel="noreferrer" href="https://kolenhen.github.io/how-to-learn/index.html" className="portfolio__link">
                            Статичный сайт
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a target="_blank" rel="noreferrer" href="https://kolenhen.github.io/russian-travel/index.html" className="portfolio__link">
                            Адаптивный сайт
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a target="_blank" rel="noreferrer"  href="https://kolenhen.students.nomoredomains.icu/" className="portfolio__link">
                            Одностраничное приложение
                        </a>
                    </li>
                </ul>
        </section >
    );
}

export default Portfolio;