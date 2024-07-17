import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./ProjectDetails.scss";
import backArrow from "../../assets/images/arrow_back.png"
import graphs from "../../assets/images/graphs.png"
import second_graphs from "../../assets/images/second_graphs.png"
import ProjectEdit from '../../components/ProjectEdit/ProjectEdit';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import edit_icon from "../../assets/images/edit_icon.png"

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const [currentEditField, setCurrentEditField] = useState("");
  const [currentValue, setCurrentValue] = useState("");

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

  const openEditModal = (field, value) => {
    setCurrentEditField(field);
    setCurrentValue(value);
    console.log("value in open edit modal is", value); //third description
    navigate(`/project/${id}/edit?field=${field}&value=${encodeURIComponent(value)}`);
  };
  
  if (failedAuth){
    return(
      <main>
        <p>Please login to view your dashboard.</p>
      </main>
    )
  }

  if (error) return <p>Error loading project details</p>;
  //console.log("project from ProjectDetails",project);

  return loading? (<h1>Loading</h1>):(
    <>
    <Header/>
    <section className='project-form__fields'>
        <div className='project__header'>
            <div className = "project__title-section">
              <img
                className="profile__icon"
                src={backArrow}
                alt="back arrow"
                onClick={() => navigate('/dashboard')}
              />
              <h1 className="project__title">{project.title}</h1>
            </div>
        </div>
        <div className="project-info">
          <div className='project-info__image'>
            <img src={graphs} alt="first project image"/>
            <img src={second_graphs} alt="first project image"/>
          </div>

          <div className = 'project-form__field' >
            <div>
              <h2 className="project-info__label">Description</h2>
              <p className = "project-info__description">{project.description}</p>
            </div>
            <div>
              <img
                src={edit_icon}
                alt="Edit"
                className="profile__icon"
                onClick={() => openEditModal("description", (project.description || ""))}
              />
            </div>
          </div>

          <div className = "project-form__field">
            <div>
              <h2 className="project-info__label">Subject categories</h2>
              <div className="project-info__tags">
                {project.subject.map((subj) => (
                  <div className="button-add" key={project.id}>
                      {subj}
                  </div>
                  ))}
              </div>
            </div>
            <div>
            <img
              src={edit_icon}
              alt="Edit"
              className="profile__icon"
              onClick={() => openEditModal("subject", project.subject || [])}
            /> 
            </div>
          </div>

          {project.skills && (
          <div className = "project-form__field">
            <div>
              <h2 className="project-info__label">Skills categories</h2>
              <div className="project-info__tags">
                {project.skills.map((skill) => (
                  <div className="button-add" key={project.id}>
                      {skill}
                  </div>
                  ))}
              </div>
            </div>
            <div>
              <img
                src={edit_icon}
                alt="Edit"
                className="profile__icon"
                onClick={() => openEditModal("skills", project.skills || [])}
              />
            </div>

          </div>
          )}
          <div className = "project-form__field">
            <div>
              <h2 className="project-info__label">Visibility</h2>
              <p>{project.visibility}</p>
            </div>
          </div>
          
          {project.tags && (
          <div className = "project-form__field">
            <div>
              <h2 className="project-info__label">Tags</h2>
              {/*But did I make general tags?? */}
              <div className="project-info__tags">
                {project.tags.map((tag) => (
                  <div className="button-add" key={project.id}>
                      {tag}
                  </div>
                  ))}
              </div>
            </div>
            <div>
              <img
                  src={edit_icon}
                  alt="Edit"
                  className="profile__icon"
                  onClick={() => openEditModal("tags", project.tags || [])}
                />
            </div>
          </div>
          )}
        </div>
    </section>
    <Footer/>
    </>

  )
};
export default ProjectDetails;
