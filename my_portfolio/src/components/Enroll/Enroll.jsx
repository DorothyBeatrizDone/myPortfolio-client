import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Enroll.scss";
import { isValidEmail,isPasswordMatch } from "../../utils/checkValidInputs";
import Header from "../Header/Header";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const enrollURL = `${baseUrl}/users/enroll`;
const Enroll = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEnroll = async (event) => {
    event.preventDefault();

    //get inputs
    const email = event.target.email.value;
    const name = event.target.name.value;
    const password =  event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    //Perform validation
    if ((!email || !name || !password || !confirmPassword)){
        setError("Please complete all form fields.");
        return;
    }
    else if (!isValidEmail(email)){
        setError("Invalid email");
        return;
    }
    else if(!(isPasswordMatch(password,confirmPassword))){
        setError("Passwords do not match");
        return;
    }
    const userInput = {
        email,
        name,
        password,
        confirmPassword
    }

    try {
      await axios.post(enrollURL, userInput);
      navigate("/login");
    } catch (error) {
      //console.log(error);
      setError(`${error.message}. What did you mess up.`); //".message" part of error
    }
  };

  return (
    <div className="login">
      <div className= "login__card">
        <h2 className="login__title">Enroll in MyPortfolio</h2>
        <form onSubmit={handleEnroll} className="form">
        <div className="form__entries">
          <label htmlFor = "email" className="form__label">Email:</label>
          <input className="form__input" type="text" name="email" id="email"/>
        </div>

        <div className="form__entries">
          <label htmlFor = "name" className="form__label">Name: </label>
          <input className="form__input" id="name" type="text" name="name" />
        </div>

        <div className="form__entries">
          <label className="form__label" htmlFor = "password">Password: </label>
          <input className="form__input" type="password" id="password" name="password" />
        </div>
        <div className="form__entries">
          <label className="form__label" htmlFor = "confirmPassword">Confirm Password: </label>
          <input className="form__input" type="password" name="confirmPassword" id="confirmPassword"/>
        </div>
        <Link to="/login">Already have an account?</Link>
        <button className="form__button" type="submit">
          Enroll
        </button>
      </form>
      </div>

      {error && (
        <label
          style={{
            color: "white",
            backgroundColor: "red",
            fontSize: "1.3rem",
          }}
        >
          {error}
        </label>
      )}
    </div>
  );
};

export default Enroll;
