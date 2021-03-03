import React from 'react';
import profilePic from '../../images/profile-pic.png'
import './AboutMe.css';

function AboutMe() {
    return (
        <section id="AboutMe" className="about-me" >
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__full">
                    <div className="about-me__info">
                        <h3 className="about-me__subtitle">
                            Виталий
                        </h3>
                        <p className="about-me__prof">
                            Фронтенд-разработчик, 30 лет
                        </p>
                        <p className="about-me__text">
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                        <ul className="about-me__socials">
                            <li className="about-me__social">
                                <a target="_blank" rel="noreferrer" href="facebook.com" className="about-me__link">
                                    Facebook
                                </a>
                            </li>
                            <li className="about-me__social">
                                <a target="_blank" rel="noreferrer" href="github.com" className="about-me__link">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                    <img src={profilePic} alt="Фото профайла" className="about-me__img" />
                </div>                
        </section >
    );
}

export default AboutMe;