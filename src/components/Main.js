import React from 'react';
import avatar from '../images/avatar.png';
import Card from './Card.js'
import { CurrentUserContext } from '../usercontext/CurrentUserContex.js';
function Main(props) {

    const {
        onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick,
        cards,
        onCardLike,
        onCardDelete
    } = props

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main ">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-img" src={currentUser.avatar || avatar} alt="аватар" />
                    <button onClick={onEditAvatar} className="profile__pencil-edit"></button>
                </div>
                <div className="profile__description">
                    <div className="profile__name">
                        <h1 className="profile__author">{currentUser.name}</h1>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                    <button onClick={onEditProfile} type="button" className="profile__button-edit"></button>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"></button>
            </section>
            <section className="cards">
                {cards.map((card) => (
                    <Card
                        key={card._id} //
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    >
                    </Card>
                ))}
            </section>
        </main>
    );
}

export default Main;