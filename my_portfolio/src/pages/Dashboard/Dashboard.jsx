import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectUpload from '../ProjectUpload/ProjectUpload';
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const projectsUrl = `${baseUrl}/users/profile`;

//Gets a list (in the form of cards) of the user's projects.
const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${projectsUrl}/projects`);
      setProjects(response.data);
    } catch (err) {
      console.log('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
      </div>
      <div className = "project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <ProjectUpload onProjectCreate={fetchProjects} />
    </section>
  );
};

export default Dashboard;