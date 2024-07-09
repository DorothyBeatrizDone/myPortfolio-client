import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Enroll.scss";

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const enrollURL = `${baseUrl}/users/enroll`;

const Enroll = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Perform validation
  const isPasswordMatch = (p1, p2) =>{
    return p1 === p2;
  }
  const isValidEmail = (email) =>{
    //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

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
    <div>
      <h1>Enroll</h1>
      <form onSubmit={handleEnroll} className="form">
        <div className="form__entries">
          <label className="form__label">Email:</label>
          <input className="form__input" type="text" name="email" />
        </div>

        <div className="form__entries">
          <label className="form__label">Name: </label>
          <input className="form__input" type="text" name="name" />
        </div>

        <div className="form__entries">
          <label className="form__label">Password: </label>
          <input className="form__input" type="password" name="password" />
        </div>

        <div className="form__entries">
          <label className="form__label">Confirm Password: </label>
          <input className="form__input" type="password" name="confirmPassword" />
        </div>
        <button className="form__button" type="submit">
          Enroll
        </button>
      </form>
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
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Enroll;
