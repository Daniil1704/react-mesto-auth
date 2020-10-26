import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../usercontext/CurrentUserContex.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';
import { api } from '../utils/Api.js'
import { register, authorize, saveToken } from '../utils/Auth.js'
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [currentUser, setCurrenUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    name: '',
    link: ''
  });
  const history = useHistory();
  const [user, setUser] = useState('');
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);



  React.useEffect(() => {
    if (loggedIn) {
    api.getUserInfo()
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }}, [loggedIn]);

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.sendUserInfo(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.sendUserAvatar(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }
  // ____________________Картоки____________________
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    if (loggedIn) {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }}, [loggedIn]);

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addCard(data)
      .then((data) => {
        setCards([...cards, data]);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleCardDelete(card) {
    const isMyOwner = card.owner === currentUser._id;

    api.deleteCard(card._id, !isMyOwner)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  // ____________________Лайки____________________

  function handleCardLike(card) {
       const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  //______________________________________Авторизация_____________________________________
  const tokenSave = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      saveToken(jwt)
        .then((res) => {
          if (res) {
            setUser(res.email)
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenSave();
  }, []);

  function updateLogin() {
    setLoggedIn(true);
  }

  function updateInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function exitAuth() {
    localStorage.removeItem('jwt');
    setUser('')
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function entranceLogin(email, password, setEmail, setPassword) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        tokenSave();
        setUser(email);
        setEmail('');
        setPassword('');
        updateLogin();
        history.push('/')
      })
      .catch((err) => {
        setError(false)
        updateInfoTooltip();
        console.log(err);
      });
  }

  function registerUser(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          history.push('/');
          setError(true);
          updateInfoTooltip();
        }
      })
      .catch((err) => {
        setError(false);
        updateInfoTooltip();
        console.log(err);
      });
  }



  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleCardClick(cardData) {
    const { link, name } = cardData;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }


  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard((setSelectedCard) => {
      return { ...setSelectedCard, isImageOpen: false }
    });
  }

  React.useEffect(() => {

    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeOverlay);
    }
  });
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={exitAuth} user={user} />
        <Switch>
          <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
          <Route path="/sign-up">
            <Register onSignup={registerUser} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={entranceLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <section className="popups">
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          >
          </EditProfilePopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          >
          </AddPlacePopup>

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
          </EditAvatarPopup>

          <ImagePopup
            isOpen={selectedCard.isImageOpen}
            onClose={closeAllPopups}
            name={selectedCard.name}
            link={selectedCard.link}
          >
          </ImagePopup>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isError={error}
          >
          </InfoTooltip>

          <PopupWithForm
            name='card-delete'
            title='Вы уверены?'
            buttonText='Да'
          >
          </PopupWithForm>
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;