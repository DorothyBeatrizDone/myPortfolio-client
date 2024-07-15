import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectUpload from '../ProjectUpload/ProjectUpload';
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Dashboard.scss';
import { useNavigate } from 'react-router-dom';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;

//Gets a list (in the form of cards) of the user's projects.
const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  
  //get the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/projects/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dashboard list of projects", response.data);
        setIsLoading(false);
        setProjects(response.data);
      } catch (err) {
        console.log('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, [token]);

  if (failedAuth){
    return(
      <main>
        <p>Please login to view your dashboard.</p>
      </main>
    )
  }
  if (projects === null){
    return <h1>Loading</h1>
  }


  return isLoading ?
    (<h1>Loading</h1>):(
    <>
      <Header/>
      <div className="dashboard">
      <div className='project-form__fields'>
        <div className="create-project__header">
          <h1 className="dashboard__title">Your Dashboard</h1>
        </div>
        <div className = "project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <button type = "button" className = "dashboard__button-add" onClick={() =>{
          navigate("/upload-project");
        }}> Add new project</button>
      </div>

    </div>
    <Footer/>


    </>

  );
};

export default Dashboard;