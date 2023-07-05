function PopupWithForm({
  name,
  title,
  buttonName,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  const popupOpened = isOpen ? "popup_opened" : "";

  return (
    <section className={`popup popup_type_${name} ${popupOpened}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form-${name}`}
          onSubmit={onSubmit}
          name={name}
          noValidate
        >
          <fieldset className="popup__form-set">
            {children}
            <button className="popup__form-save-btn" type="submit">
              {buttonName}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
