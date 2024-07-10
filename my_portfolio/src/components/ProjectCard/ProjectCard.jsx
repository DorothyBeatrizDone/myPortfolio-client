const ProjectCard = ({ project }) => {
    const formatTimestamp = (timestamp) => {
      // Return the project timestamp formatted as 'month/day/year, hr:min:sec'
      return new Date(timestamp).toLocaleString('en-US');
    };

    return (
      <article className="project">
        <div className="project__main-image">
          <img
            className="project__image"
            src={project_url}
            alt={`project image`}
          />
        </div>
        <div className="project__details">
          <h2 className="project__title">{project.title}</h2>
          <p className="project__description">{project.description}</p>
          <div className="project__info">
            <div class="project__info--item">Subject: 
              {project.subject.map((subject) => (
              <div className="project__tag" key={project.id}>
                  {skill}
              </div>
            ))}
            </div>
            <div class="project__info--item">Skills: 
              {project.skills.map((skill) => (
                <div className="project__tag" key={project.id}>
                    {skill}
                </div>
              ))}
            </div>
            <div class="project__info--item">Visibility: {project.visibility}</div>
          </div>
        </div>
    </article>
    );
  };
  
  export default ProjectCard;