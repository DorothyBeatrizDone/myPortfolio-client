import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import backArrow from "../../assets/images/arrow_back.png"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DynamicForm from "../DynamicForm/DynamicForm";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
import "./ProfileEdit.scss";
// Profit Edit will either modify (save) or delete the section
const profileUrl = `${baseUrl}/users/profile`;

const ProfileEdit = ({setUserInfo, userInfo}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const field = query.get("field");
    const value = query.get("value");
    const [error, setError] = useState("");
    const [editValues, setEditValues] = useState(value);
    const [failedAuth, setFailedAuth] = useState(false);
    
    
    //retrieve the JWT token from the session storage
    const token = sessionStorage.getItem("JWTtoken");

    useEffect(() =>{
      if(!token){
        setFailedAuth(true);
      }
    },[token]);

    const handleDelete = async (field) => {
      try {
        const response = await axios.patch(profileUrl, { [field]: null }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    };

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleSave = async(e)=>{
        //might need to refresh my memory on response.data syntax!
        e.preventDefault();
 
        const updatedValue = editValues;
        console.log("updatedValue", updatedValue);
        const updatedSection = { [field]: updatedValue };
        console.log("updatedSection", updatedSection);

        try {
          const response = await axios.patch(profileUrl, updatedSection, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        setUserInfo(response.data);
        navigate("/profile");
      } catch (error) {
        setError('Error updating your profile', error);
      }
    };

    if (failedAuth) {
      return (
        <main className="profile">
          <p>You must be logged in to view your profile</p>
          <p>
            <Link to="/login">Log in</Link>
          </p>
        </main>
      );
    }

    const handleChange = (e) => {
        setEditValues(e.target.value);
    };


    return (
/*
      <div className='project__header'>
      <div className = "project__title-section">
        <img
          className="project__header-arrow"
          src={backArrow}
          alt="back arrow"
          onClick={() => navigate('/dashboard')}
        />
        <h1 className="project__title">{project.title}</h1>
        <button type = "button" onClick={() =>{ 
            openEditModal("title", project.title )}}> Edit </button>
      </div>
  </div>
  */<>
      <Header/>
      <section className="project-form__fields">
        <div className = "create-project__header">
          <img
            className="profile__icon"
            src={backArrow}
            alt="back arrow"
            onClick={() => navigate('/profile')}
          />
          <h1 className="dashboard__title">Edit {field}</h1>
      </div>
        
        <form onSubmit = {handleSave} >
          <div className="project-form__field">
            <label className = "project-form__label" htmlFor={field}>Edit {field}</label>
            <input className = "project-form__input-field" type = "text" id = {field} name = {field} value = {editValues} onChange = {handleChange}/>
          </div>
          <div className="project-form__buttons">
            <button type="submit" className="button-add">Save changes</button>
            <button type="button" className="button-add" onClick={() => handleDelete(field)}>Delete {field}</button>
          </div>
        </form>
      </section>
      <Footer/>
  </>



    );
};

export default ProfileEdit;
