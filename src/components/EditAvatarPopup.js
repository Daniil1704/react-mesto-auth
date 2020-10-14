import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateAvatar,
        isLoading
    } = props

    const inputAvatar = React.useRef('');

    React.useEffect(() => {
        inputAvatar.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatar.current.value
        })
    }

    return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
     
     <input name="avatar" className="popup__input popup__input_name" type="url" placeholder="Ссылка на картинку" defaultValue="" required ref={inputAvatar}/>
     
     <span className="popup__span-error"></span>
      
      </PopupWithForm>
    )
}

export default EditAvatarPopup;