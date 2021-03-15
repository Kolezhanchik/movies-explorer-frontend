import React, { useState } from 'react';
import './ErrorsModal.css';

function ErrorsModal(props) {

    
    

    return (
        <div onClick={() => { props.setIsOpen(false) }} className={`errors-modal ${props.isOpen && 'errors-modal__opened'}`}>
            <div className="errors-modal__container">
                <button onClick={() => { props.setIsOpen(false) }} type="button" className="errors-modal__close">&#9587;</button>
                <span
                    className={props.type ? `errors-modal__info errors-modal__info_positive`
                        : 'errors-modal__info  errors-modal__info_negative'}></span>
                <h2 className="errors-modal__text">{props.errorMessage}</h2>
            </div>
        </div>
    )
}

export default ErrorsModal;