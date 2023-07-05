import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__form-input_avatar_src"
        ref={avatarRef}
        id="avatar-input"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__form-input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
