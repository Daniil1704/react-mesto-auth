
import React from 'react';

function ImagePopup(props) {

    const {
        isOpen,
        onClose,
        name,
        link,

    } = props

    return (
        <div className={`popup popup-picture ${isOpen && 'popup_opened'}`}>
            <div className="popup-picture__case">
                <button onClick={onClose} type="button" className="popup__close"></button>
                <img className="popup-picture__image" alt={name} src={link} />
                <p className="popup-picture__title">{name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;