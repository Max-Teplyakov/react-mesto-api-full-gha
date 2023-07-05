import { useState } from "react";
import Header from "./Header";


function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    const { password, email } = formValue;
    handleLogin(password, email, setFormValue);
  };
  return (
    <>
      <Header text="Регистрация" link="sign-up" />

      <div className="authorization">
        <h1 className="authorization__form-title">Вход</h1>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="authorization__email"
            id="email-login-input"
            placeholder="Email"
            value={formValue.email || ""}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="authorization__password"
            placeholder="Пароль"
            id="login-password-input"
            value={formValue.password || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="authorization__btn-registration">
            Войти
          </button>
        </form>
      </div>
      
    </>
  );
}

export default Login;
