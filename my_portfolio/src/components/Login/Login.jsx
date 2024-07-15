import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";
import Header from "../Header/Header";

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;

const loginURL = `${baseUrl}/users/login`;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginURL, {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      console.log(response.data);
      sessionStorage.setItem("JWTtoken", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(
        `${error.response.data.error.message}. Please check all fields.`
      );
    }
  };

  return (

    <div className="login">
      <div className="login__card">
        <h2 className="login__title">Login to MyPortfolio</h2>
        <form onSubmit={handleLogin} className="form">
        <div className="form__entries">
          <label htmlFor = "email" className="form__label">Email:</label>
          <input type="text" id="email" name="email" className="form__input"/>
        </div>
        <div className="form__entries">
          <label htmlFord = "password" className="form__label">Password:</label>
          <input type="password"  id="password" name="password"  className="form__input"/>
        </div>
        <div className="form__footer">
            <a href="/enroll" className="form__footer-text">Don't have an account yet?</a>
          </div>
        <button className="form__button" type="submit">
          Login
        </button>
      </form>
      </div>

    </div>
  );
};

export default Login;
