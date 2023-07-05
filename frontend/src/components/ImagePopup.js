function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image overlay popup_opened`}>
      <figure className="popup__figure-image">
        <button
          className="popup__close-btn popup__btn-image-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__title popup__title-image">
          {card.name}
        </figcaption>
      </figure>
    </section>
  );
}
export default ImagePopup;
