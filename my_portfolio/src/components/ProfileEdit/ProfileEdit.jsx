import { useState, useEffect } from "react";
import axios from "axios";
import DynamicForm from "../DynamicForm/DynamicForm"
import { Link, useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
import backArrow from "../../assets/images/arrow_back.png";
import "./ProfileEdit.scss"

// Profit Edit will either modify (save) or delete the section
const profileUrl = `${baseUrl}/users/profile`;

const ProfileEdit = ({field, value, closeModal, setUserInfo, userInfo}) => {
    const [error, setError] = useState("");
    const [editValue, setEditValue] = useState(value);

    //retrieve the JWT token from the session storage
    const token = sessionStorage.getItem("JWTtoken");

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleSave = async()=>{
        //might need to refresh my memory on response.data syntax!
      try {
        const response = await axios.patch(profileUrl, {[field]: editValue}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data)
        closeModal();
      } catch (error) {
        setError('Error updating your profile', error);
      }
    };

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };


    return (
    <section className="edit">
        <h1>Edit {field}</h1>
          <form onSubmit = {handleSave}>
            <label htmlFor={field}>{field}</label>
            <input type = "text" id = {field} name = {field} value = {editValue} onChange = {handleChange}/>
            <button type="submit">Save</button>
          </form>
      </section>
    );
};

export default ProfileEdit;
