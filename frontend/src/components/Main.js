import React from "react";
import { useContext } from "react";
import Card from "./Card";
import imageplus from "../images/plus.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  signOut,
  userEmail,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header text="Выйти" link="main" name={userEmail} signOut={signOut} />
      <section className="profile">
        <div className="profile__avatar-edit" onClick={onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__redact active"
              onClick={onEditProfile}
              type="button"
            />
          </div>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button active"
          type="button"
          onClick={onAddPlace}
        >
          <img
            src={imageplus}
            alt="крестик кнопка"
            className="profile__btn-img"
          />
        </button>
      </section>

      <section className="elements">
        {cards.map((cardItem) => (
          <Card
            cardData={cardItem}
            key={cardItem._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
