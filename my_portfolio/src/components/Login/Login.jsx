import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

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
      navigate("/");
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
        <div className= "login__header-container">
          <h1 className="login__header">MyPortfolio</h1>
        </div>
        <div className = "login__tabs">
          <button className="login__button--active">Login</button>
          <button className="login__button">Sign Up</button>
        </div>
      </div>
      <form onSubmit={handleLogin} className="form">
        <div className="form__entries">
          <label htmlFor = "email" className="form__label">Email:</label>
          <input type="text" id="email" name="email" className="form__input"/>
        </div>
        <div className="form__entries">
          <label htmlFor = "password" className="form__label">Password:</label>
          <input type="password"  id="password" name="password"  className="form__input"/>
        </div>
        <div className="form__footer">
            <a href="/enroll">Forgot Password?</a>
            <a href="/enroll">Create an Account</a>
          </div>
        <button className="form__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
