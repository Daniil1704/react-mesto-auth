import React from 'react';
import logoError from '../images/error.png';
import logoSuccess from '../images/success.png';

function InfoTooltip(props) {

    const {
        isOpen,
        onClose,
        isError
    } = props

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={onClose} type="button"></button>
                <div className="infotooltip">
                    <img className="infotooltip__image" src={isError ? logoSuccess : logoError} alt="лого"></img>
                    <h3 className="infotooltip__title">{isError ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;