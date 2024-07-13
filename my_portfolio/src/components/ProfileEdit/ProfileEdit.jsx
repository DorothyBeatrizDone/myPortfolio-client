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
    const [error, setError] = useState(value);
    const [editValue, setEditValue] = useState("");

    //retrieve the JWT token from the session storage
    const token = sessionStorage.getItem("JWTtoken");

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleSave = async()=>{
        //might need to refresh my memory on response.data syntax!
      let updatedProfile = { ...userInfo, [field]:editValue}
      try {
        const response = await axios.put(profileUrl, updatedProfile, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data)
        closeModal();
      } catch (error) {
        setError('Error editing.');
      }
    };

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    return (
    <section className="edit">
        <h1>Edit {field}</h1>
        {/* If the field is skills or languages then call Dynamic Form}*/}
        {field === "skills" || field === "languages"} ?(
            <DynamicForm
                label = {field === "skills" ? "Skills" : "Languages" }
                name = {field}
                items = {editValue}
                setItems = {setEditValue}
                type = "text"
            />
        ) : (
            <input type = "text" value = {editValue} onChange = {handleChange}/>
            )
            <button onClick = {handleSave}>Save</button>
            <button onClick = {closeModal}>Cancel</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ProfileEdit;
