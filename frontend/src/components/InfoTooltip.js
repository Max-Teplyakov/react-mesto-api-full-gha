function InfoTooltip({ text, img, onClose, isOpen }) {
  const popupOpened = isOpen ? "popup_opened" : "";

  return (
    <section className={`popup ${popupOpened}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image-successful" src={img} alt=""></img>
        <h2 className="popup__title-successful">{text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
