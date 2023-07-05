import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { api } from "../utils/api";

import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import img from "../images/successful.png";
import img2 from "../images/notsuccessful.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isStatusInfoTooltip, setIsStatusInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate("/main", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleLogin(password, email, setFormValue) {
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(email, password) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          navigate("/sign-in", { replace: true });
          setIsStatusInfoTooltip(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsStatusInfoTooltip(false);
      })
      .finally(setIsInfoTooltipPopupOpen(true));
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/login");
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .replaceUserData(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .repllaceAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipPopupOpen(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/sign-up"
          element={<Register handleRegistration={handleRegistration} />}
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/main"
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              signOut={signOut}
              userEmail={userEmail}
            />
          }
        />
        {/* <Route path="*" element={<h2>Not Found</h2>} /> */}
      </Routes>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      {/* <!-------------------------------------  Попап добавления Карточки --> */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateCard={handleAddPlaceSubmit}
      />
      {/* <!---------------------------------------------   Попап Удаления --> */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonName="Да"
      ></PopupWithForm>
      {/* <!---------------------------------------------   Попап Аватар --> */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      {/* <!-- Попап Картиинки --> */}
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
      {isStatusInfoTooltip ? (
        <InfoTooltip
          text="Вы успешно зарегистрировались!"
          img={img}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      ) : (
        <InfoTooltip
          text="Что-то пошло не так!
        Попробуйте ещё раз."
          img={img2}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
