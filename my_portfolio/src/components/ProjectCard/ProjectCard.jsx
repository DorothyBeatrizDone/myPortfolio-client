import './ProjectCard.scss';
import project_image from "../../assets/images/graphs.png"
import { useNavigate } from 'react-router-dom';
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
    const formatTimestamp = (timestamp) => {
      // Return the project timestamp formatted as 'month/day/year, hr:min:sec'
      return new Date(timestamp).toLocaleString('en-US');
    };

    return (
      <article className="project">
        <div className="project__main-image">
          <img
            className="project__image"
            src={project_image}
            alt={`project image`}
          />
        </div>
        
        <div className="project__details">
          <div className= "project__header-card">
            <h2 className="project__card-title">{project.title}</h2>
          </div>

          <div className="project__info">
            <div className="project__info--item">
              <div className = "project__label">Subject: </div>
              <p className="project__label-value">{project.description}</p>
            </div>
            <div className="project__info--item">
              <div className = "project__label">Subject: </div>
              {project.subject.map((subject) => (
              <p key={project.id} className='project__label-value'>{subject}, </p>
              ))}
            </div>
            
            {project.skills && (
            <div className="project__info--item">
              <div className = "project__label"> Skills: </div>
              {project.skills.map((skill) => (
                <div key={project.id} className='project__label-value'>
                    {skill}
                </div>
              ))}
            </div>)}
            <div className="project__info--item">
            <div className = "project__label"> Visibility: </div>
              <div className='project__label-value'> {project.visibility}</div>
            </div>
              <button className = "project__details-button" type="button" onClick={() =>{
              navigate(`/project/${project.post_id}`);
            }}>View Details
            </button>
          </div>
        </div>
    </article>
    );
  };
  
  export default ProjectCard;