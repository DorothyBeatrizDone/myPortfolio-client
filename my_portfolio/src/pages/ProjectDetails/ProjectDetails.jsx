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
    <section className='project'>
        <div className='project__header'>
          <h1 className="project__title">{project.title}</h1>
          <button className ="edit-button" type ="submit">Edit</button>
        </div>
        <div className="project-info">
          <div className='project-info__image'>
            <img src={project} alt="project image"/>
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
          <div className = "project-info__section">
            <h2 className="project-info__label">Visibility</h2>
            <p>{project.visibility}</p>
          </div>
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
        </div>
    </section>
  )
};
export default ProjectDetails;
