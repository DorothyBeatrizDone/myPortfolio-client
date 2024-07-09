import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
import axios from 'axios';
const baseUrl = `http://${host}:${PORT}`;

const ProjectDetailPage = () => {
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

    <div>
        <div>
          <button type ="submit">Edit</button>
          <h1>{project.title}</h1>
        </div>
        <div className='project__image'>
          {/* but what if there are several images. For loop or map function??*/}
          <h2>Uploaded work</h2>
        </div>
        <div className = 'project-info'>
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
    </div>

  return
}