import React from 'react';
import './Footer.css';

function Footer() {
    const today = new Date();
    return (
        <footer className='footer' >
            <div className="footer__content">
                <h2 className="footer__title">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </h2>
                <div className="footer__wrap">
                    <p className="footer__copyright">
                        &#169;{today.getFullYear()}
                    </p>
                    <ul className="footer__socials">
                        <li>
                            <a target="_blank" rel="noreferrer" className="footer__social" href="https://praktikum.yandex.ru/profile/web/">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" className="footer__social" href="https://github.com/KoLenhen?tab=repositories">
                                Github
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" className="footer__social" href="facebook.com">
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer >
    );
}

export default Footer;