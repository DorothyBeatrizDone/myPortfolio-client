const ProjectCard = ({ project }) => {
    const formatTimestamp = (timestamp) => {
      // Return the project timestamp formatted as 'month/day/year, hr:min:sec'
      return new Date(timestamp).toLocaleString('en-US');
    };

    return (
      <article className="project">
        <div className="project__details">
          <div className="project__main-image">
            <img
              className="project__image"
              src={project_url}
              alt={`project image`}
            />
          </div>
          <h2 className="project__title">{project.title}</h2>
          <p className="project__published">{formatTimestamp(project.updated_at)}</p>
          <p className="project__description">{project.description}</p>
          <div className="project__skills">
          {project.skills.map((skill) => (
            <div className="project__tag" key={project.id}>
                {skill}
            </div>
            ))}
        </div>
        <div className="project__subjects">
          {project.subject.map((subj) => (
            <div className="project__tag" key={project.id}>
                {subj}
            </div>
            ))}
        </div>
        <p className= "project__visibility">Visibility: {project.visibility}</p>
        </div>
    </article>
    );
  };
  
  export default ProjectCard;