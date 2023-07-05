import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

function Register({ handleRegistration }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    handleRegistration(email, password);
  };

  return (
    <>
      <Header text="Войти" link="sign-in" />
      <div className="authorization">
        <h1 className="authorization__form-title">Регистрация</h1>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="authorization__email"
            id="email-input"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="authorization__password"
            id="registr-password-input"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="authorization__btn-registration">
            Зарегистрироваться
          </button>
        </form>
        <Link className="authorization__btn-login" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
