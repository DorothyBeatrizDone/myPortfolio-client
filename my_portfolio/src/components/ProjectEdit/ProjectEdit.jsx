import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
import backArrow from "../../assets/images/arrow_back.png";

const baseUrl = `http://${host}:${PORT}`;
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// Profit Edit will either modify (save) or delete the section

const ProjectEdit = ({setProject, project}) => {
    //console.log("project inside project edit", project);
    const navigate = useNavigate();
    const { id } = useParams();
    const projectUrl = `${baseUrl}/projects/${id}`;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const field = query.get("field");
    const value = query.get("value");
    //console.log("field in project edit", field);
    
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
        const response = await axios.patch(projectUrl, { [field]: null }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    };

    const handleDeleteEntireProject = async (field) => {
      try {
        const response = await axios.delete(projectUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    };

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleSave = async(e)=>{
        //might need to refresh my memory on response.data syntax!
        e.preventDefault();
 
        const updatedValue = editValues;
        //console.log("updatedValue", updatedValue);
        let updatedSection = { [field]: updatedValue };
        if (field !== "about"){
          updatedSection = updatedSection[field].split(",");
        }
        //console.log("updatedSection", updatedSection);

        try {
          const response = await axios.patch(projectUrl, updatedSection, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        //console.log("project edit response.data", response.data);
        setProject(response.data);
        navigate(`/project/${id}`);
      } catch (error) {
        setError('Error updating your project', error);
      }
    };
    //console.log("project edit entire project?", project);

    if (failedAuth) {
      return (
        <main className="project">
          <p>You must be logged in to view your project</p>
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
    <>
    <Header/>
    <div className="project-form__fields">
      <div className="create-project__header">
        <img
            className="profile__icon"
            src={backArrow}
            alt="back arrow"
            onClick={() => navigate(`/project/${id}`)}
          />
        
        <h1 className="dashboard__title">Edit {field}</h1>
      </div>
        <form onSubmit = {handleSave}>
          <label className ="project-info__label" htmlFor={field}>{field}</label>
          <input className ="project-form__input-field"type = "text" id = {field} name = {field} value = {editValues} onChange = {handleChange}/>
          <button type="submit" className="button-add">Save changes</button>
          <button type="button" className="button-add" onClick={() => handleDelete(field)}>Delete {field}</button>
        </form>
      </div>
    <Footer/>
    </>

    );
};

export default ProjectEdit;
