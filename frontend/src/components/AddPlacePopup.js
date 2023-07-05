import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCard({ name, link });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__form-input_card_name"
        id="name-card-input"
        value={name ?? ""}
        onChange={handleChangeName}
        name="title"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__form-input-error name-card-input-error"></span>

      <input
        className="popup__form-input popup__form-input_card_src"
        id="url-card-input"
        value={link ?? ""}
        onChange={handleChangeLink}
        name="data"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__form-input-error url-card-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
