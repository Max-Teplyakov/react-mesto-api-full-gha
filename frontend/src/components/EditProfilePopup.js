import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__form-input_person_name"
        onChange={handleChangeName}
        value={name || ""}
        id="name-input"
        name="name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__form-input-error name-input-error"></span>
      <input
        className="popup__form-input popup__form-input_person_about-me"
        onChange={handleChangeDescription}
        value={description || ""}
        id="about-me-input"
        name="aboutme"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__form-input-error about-me-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
