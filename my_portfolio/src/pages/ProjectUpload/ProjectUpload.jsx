import { useEffect, useState } from 'react';
import axios from 'axios';

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const SERVER_URL = `http://${host}:${PORT}`;

const ProjectUpload = ({onProjectCreate}) => {


  //TBC, I am going to work now on something else. 
  //Things to fix: list of skills and list of subjects, adding them in the form of tags.
  //Also, I think I need to pass the user_id here. How do I get that again?
  //no, we don't pass the id, but the backend has req.user.id... remember to print req. where
  //does req.user come in?
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const { postTitle, projectUrl, endTime, visibilitySettings, subject, skill, projectDescription } = e.target;

    try {
        const response = await axios.post(`${SERVER_URL}/projects`,
            {
              title: postTitle.value,
              project_url: projectUrl.value,
              end_time: endTime.value,
              visibility_settings: visibilitySettings.value,
              skill : skill.value, 
              subject: subject.value,
              project_description: projectDescription.value,
            }
          );
          onProjectCreate();
          e.target.reset();
    } catch (error) {
        console.log('Error creating a new project:', error);
    }
    // Post to API (remember to use `withCredentials`)

  return (
    <section className="create-post">
      <form className="post-form" onSubmit={handleFormSubmit}>
        <h3>Create New Post</h3>
        <div className="post-form__fields">
          <div className="post-form__field">
            <label htmlFor="postTitle" className="post-form__label">
              Project Title
            </label>
            <input
              type="text"
              name="postTitle"
              id="postTitle"
              maxLength="75"
              required
            />
          </div>
          <div className="post-form__field">
          <label htmlFor="projectUrl" className="post-form__label">
              Project URL
            </label>
          <input 
            type="url" 
            id="projectUrl" 
            name = "projectUrl"
            placeholder="https://example.com"
            required/>
        </div>
          <div className="post-form__field">
            <label htmlFor="postDescription" className="post-form__label">
              Post Description
            </label>
            <textarea
              type="text"
              name="postDescription"
              id="postDescription"
              required
            />
          </div>
          <div className="post-form__field">
          <label htmlFor="endTime" className="post-form__label">
              Project Finished Date
            </label>
          <input 
            type="datetime-local" 
            id="endTime" 
            name = "endTime"/>
        </div>
        <div className="post-form__field">
          <label htmlFor="visibilitySettings" className="post-form__label">
              Visibility settings
            </label>
          <select 
            id="visibilitySettings" 
            name = "visibilitySettings"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="post-form__field">
          <label htmlFor="subject" className="post-form__label">
              Subject
            </label>
          <input 
            type = "text"
            placeholder="Skill (ex: Project Management)"
            id="subject" 
            name = "subject"
          />
        </div>
        


        </div>

        <button type="submit" className="post-form__submit">
          🖋️&nbsp;&nbsp;Submit
        </button>
      </form>
    </section>
  );
    };
};

export default ProjectUpload;