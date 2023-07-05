import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  const currentUser = useContext(CurrentUserContext);

  const isOwn = cardData.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__btn-delete-card ${
    isOwn && "element__btn-delete-card_visible"
  }`;
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__btn-like ${
    isLiked && "element__btn-like_active"
  }`;

  return (
    <div className="element">
      <img
        className="element__img"
        alt={cardData.name}
        src={cardData.link}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__block">
        <h2 className="element__title">{cardData.name}</h2>
        <div className="element__block-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__number-like">{cardData.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
