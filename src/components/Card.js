import React from 'react';
import { CurrentUserContext } from '../usercontext/CurrentUserContex.js';
import '../images/avatar.png';

function Card(props) {

    const {
        card,
        onCardClick,
        onCardLike,
        onCardDelete
    } = props

    const currentUser = React.useContext(CurrentUserContext);
    const isMyOwner = card.owner._id === currentUser._id;

    const cardDeleteButton = (`card__rubbish ${isMyOwner ? 'card__rubbish_active' : ''}`);

    const isLiked = card.likes.some(i => i._id === currentUser._id);
   
    const cardLikeButton = (
        `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
    );

    function handleImageClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <div className="card">
            <button className={`${cardDeleteButton}`} onClick={handleDeleteClick} type="button"></button>
            <img className="card__image" alt="изображение" src={card.link} onClick={handleImageClick} />

            <div className="card__photo-name">
                <p className="card__photo-title">{card.name}</p>
                <div className="card__like">
                    <button onClick={handleLikeClick} type="button" className={`${cardLikeButton}`} ></button>
                    <span className="card__span-like">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;