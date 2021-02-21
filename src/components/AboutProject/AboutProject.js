import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section id="AboutProject" className="about-project" >
            <div className="about-project__wrap">
                <h2 className="about-project__title">О проекте</h2>
                <ul className="about-project__list">
                    <li className="about-project__list-item">
                        <h3 className="about-project__subtitle">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about-project__text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </li>
                    <li className="about-project__list-item">
                        <h3 className="about-project__subtitle">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about-project__text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </li>
                </ul>
                <table width="100%">
                    <tr>
                        <td width="20%" align="center" bgcolor="#2BE080" height="36" className="about-project__text">
                            1 неделя
                        </td>
                        <td width="80%" align="center" bgcolor="#F2F2F2" height="36" className="about-project__text">
                            4 недели
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="center" height="36" className="about-project__text about-project__text_grey">
                            Back-end
                        </td>
                        <td width="80%" align="center" height="36" className="about-project__text about-project__text_grey">
                            Front-end
                        </td>
                    </tr>
                </table>
            </div>
        </section >
    );
}

export default AboutProject;