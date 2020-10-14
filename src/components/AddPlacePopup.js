import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {

    const {
        isOpen,
        onClose,
        onAddPlace,
        isLoading
    } = props;

    const inputName = React.useRef('');
    const inputLink = React.useRef('');

    React.useEffect(() => {
        inputName.current.value = '';
        inputLink.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: inputName.current.value,
            link: inputLink.current.value
        });
    }

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >

            <input name="name" className="popup__input popup__input_name " id="name-input" type="text" placeholder="Название"
                minLength="1" maxLength="30" required ref={inputName} />
            <span className="popup__span-error" ></span>
            <input name="link" className="popup__input popup__input_link " id="link-input" type="url"
                placeholder="Ссылка на картинку" required ref={inputLink} />
            <span className="popup__span-error" ></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;