import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ text, link, name, signOut }) {
  return (
    <header className="header">
      <img src={logo} alt="логотип Сайта" className="header__img" />
      <div className="header__component">
        <p className="header__name">{name}</p>
        <Link className="header__btn" to={`/${link}`} onClick={signOut}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
