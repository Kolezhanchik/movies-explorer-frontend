import React, { useState } from 'react';
import './ErrorsModal.css';
function ErrorsModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(false);

    return (
        <div onClick={() => { setIsOpen(false) }} className={`errors-modal ${isOpen && 'errors-modal__opened'}`}>
            <div className="errors-modal__container">
                <button onClick={() => { setIsOpen(false) }} type="button" className="errors-modal__close">&#9587;</button>
                <span
                    className={type ? `errors-modal__info errors-modal__info_positive`
                        : 'errors-modal__info  errors-modal__info_negative'}></span>
                <h2 className="errors-modal__text">message from props</h2>
            </div>
        </div>
    )
}

export default ErrorsModal;