import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
import "./ProjectDetails.scss";
import backArrow from "../../assets/images/arrow_back.png"

import graphs from "../../assets/images/graphs.png"
import second_graphs from "../../assets/images/second_graphs.png"

import axios from 'axios';
const baseUrl = `http://${host}:${PORT}`;

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);

 //get the JWT token from the session storage
 const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${baseUrl}/projects/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        setProject(response.data);

      } catch (err) {
        setError(`${error.message}`);
        setLoading(false);
      }
    }

    fetchProject();
  }, [id,token]);

  if (failedAuth){
    return(
      <main>
        <p>Please login to view your dashboard.</p>
      </main>
    )
  }

  if (error) return <p>Error loading project details</p>;
  console.log("project from ProjectDetails",project);

  return loading? (<h1>Loading</h1>):(
    <section className='project'>
        <div className='project__header'>
            <div className = "project__title-section">
              <img
                className="project__header-arrow"
                src={backArrow}
                alt="back arrow"
                onClick={() => navigate('/dashboard')}
              />
              <h1 className="project__title">{project.title}</h1>
            </div>
          <button className ="edit-button" type ="submit">Edit</button>
        </div>
        <div className="project-info">
          <div className='project-info__image'>
            <img src={graphs} alt="first project image"/>
            <img src={second_graphs} alt="first project image"/>
          </div>
          <div className = 'project-info__section' >
            <h2 className="project-info__label">Description</h2>
            <p className = "project-info__description">{project.description}</p>
          </div>
          <div className = "project-info__section">
            <h2 className="project-info__label">Subject categories</h2>
            <div className="project-info__tags">
              {project.subject.map((subj) => (
                <div className="project-info__tag" key={project.id}>
                    {subj}
                </div>
                ))}
            </div>
          </div>
          {project.skills && (
          <div className = "project-info__section">
            <h2 className="project-info__label">Skills categories</h2>
            <div className="project-info__tags">
              {project.skills.map((skill) => (
                <div className="project-info__tag" key={project.id}>
                    {skill}
                </div>
                ))}
            </div>
          </div>
          )}
          <div className = "project-info__section">
            <h2 className="project-info__label">Visibility</h2>
            <p>{project.visibility}</p>
          </div>
          {project.tags && (
          <div className = "project-info__section">
            <h2 className="project-info__label">Tags</h2>
            {/*But did I make general tags?? */}
            <div className="project-info__tags">
              {project.tags.map((tag) => (
                <div className="project-info__tag" key={project.id}>
                    {tag}
                </div>
                ))}
            </div>
          </div>
          )}
        </div>
    </section>
  )
};
export default ProjectDetails;
