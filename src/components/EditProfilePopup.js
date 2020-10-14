import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../usercontext/CurrentUserContex.js';

function EditProfilePopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateUser,
        isLoading
    } = props

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameUpdate(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);


    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >

            <input
                defaultValue={name}
                className="popup__input popup__input_author"
                id="author-input"
                type="text"

                minLength={2}
                maxLength={40}
                pattern="[A-Za-zА-ЯЁа-яё -]{1,}"
                placeholder="Имя"
                onChange={handleNameUpdate}
                required
            />
            <span className="popup__span-error" ></span>
            <input
                defaultValue={description}
                className="popup__input popup__input_about"
                id="about-input"
                type="text"
                minLength={2}
                maxLength={40}
                placeholder="О себе"
                onChange={handleDescription}
                required
            />
            <span className="popup__span-error" ></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;