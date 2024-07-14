import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;

// Profit Edit will either modify (save) or delete the section

const ProjectEdit = ({setProject, project}) => {
    console.log("project inside project edit", project);
    const navigate = useNavigate();
    const { id } = useParams();
    const projectUrl = `${baseUrl}/projects/${id}`;
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

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleSave = async(e)=>{
        //might need to refresh my memory on response.data syntax!
        e.preventDefault();
 
        const updatedValue = editValues;
        console.log("updatedValue", updatedValue);
        const updatedSection = { [field]: updatedValue };
        console.log("updatedSection", updatedSection);

        try {
          const response = await axios.patch(projectUrlUrl, updatedSection, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        setProject(response.data);
        console.log("project edit entire project?", project);
        navigate(`/project/${id}`);
      } catch (error) {
        setError('Error updating your project', error);
      }
    };

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
    <section className="edit">
        <h1>Edit {field}</h1>
        <form onSubmit = {handleSave}>
          <label htmlFor={field}>{field}</label>
          <input type = "text" id = {field} name = {field} value = {editValues} onChange = {handleChange}/>
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => handleDelete(field)}>Delete {field}</button>
        </form>
      </section>
    );
};

export default ProjectEdit;
