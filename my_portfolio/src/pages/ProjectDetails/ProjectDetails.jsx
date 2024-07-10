import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
import axios from 'axios';
const baseUrl = `http://${host}:${PORT}`;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);


  const fetchProject = async () => {
    try {
      const response = await axios.get(`{baseUrl}/projects/${id}`);
      setProject(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading project details</p>;

  return(
    <section className='project-details'>
        <div className='project__header'>
          <h1 className="project__title">{project.title}</h1>
          <button className ="edit-button" type ="submit">Edit</button>
        </div>
        <div className="project__info">
          <div className='project__image'>
            <img src={project} alt="project image"/>
          </div>
          <div className = 'project-info__section' >
            <h2>Description</h2>
            <p>{project.description}</p>
          </div>
          <div className = "project-info__section">
            <h2>Subject categories</h2>
            <div className="project__subjects">
              {project.subject.map((subj) => (
                <div className="project__tag" key={project.id}>
                    {subj}
                </div>
                ))}
            </div>
          </div>
          <div className = "project-info__section">
            <h2>Skills categories</h2>
            <div className="project__skills">
              {project.skills.map((skill) => (
                <div className="project__tag" key={project.id}>
                    {skill}
                </div>
                ))}
            </div>
          </div>
          <div className = "project-info__section">
            <h2>Visibility</h2>
            <p>{project.visibility}</p>
          </div>
          <div className = "project-info__section">
            <h2>Tags</h2>
            <div className="project__tags">
              {project.tags.map((tag) => (
                <div className="project__tag" key={project.id}>
                    {tag}
                </div>
                ))}
            </div>
          </div>
        </div>
    </section>
  )
};
export default ProjectDetails;
