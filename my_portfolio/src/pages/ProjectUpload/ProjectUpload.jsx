import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicForm from '../../components/DynamicForm/DynamicForm';

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const SERVER_URL = `http://${host}:${PORT}`;

const ProjectUpload = () => {
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);
  const [error, setError] = useState("");

  //not sure why we need useEffect?
  useEffect(() =>{
    const token = sessionStorage.getItem("JWTtoken");
    console.log("token is", token);
      if (!token) {
        setFailedAuth(true);
      }
      else{
        setFailedAuth(false);
      }
  },[]);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("JWTtoken");
    const uploadedForm = {
      title: e.target.projectTitle.value,
      project_url: e.target.projectUrl.value,
      end_time: e.target.endTime.value,
      visibility: e.target.visibilitySettings.value, 
      skills,
      subject: e.target.subject.value,
      tags,
      files,
      description: e.target.projectDescription.value,
    };

    try {
      await axios.post(`${SERVER_URL}/projects/`, uploadedForm, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        //onProjectCreate();
        e.target.reset();
        {/* Reset the state after form submission since .reset() does not reset the states!*/}
        setSkills([]);
        setTags([]);
        setFiles([]);
        setSubjects([]);
    } catch (error) {
        setError('Error creating a new project.');
    }
  }

  return failedAuth ?(
      <p>Please log in to create a project.</p>
    ): (
    <section className="create-project">
      <form className="project-form" onSubmit={handleFormSubmit}>
        <h3>Create New Project</h3>
        <div className="project-form__fields">
          {/*Title */}
          <div className="project-form__field">
            <label htmlFor="projectTitle" className="project-form__label">
              Project Title
            </label>
            <input
              type="text"
              name="projectTitle"
              id="projectTitle"
              maxLength="75"
              required
            />
          </div>
          {/*URL*/}
          <div className="project-form__field">
            <label htmlFor="projectUrl" className="project-form__label">
                Project URL
              </label>
            <input 
              type="url" 
              id="projectUrl" 
              name = "projectUrl"
              placeholder="https://example.com"
              required/>
          </div>
          {/*Description*/}
          <div className="project-form__field">
            <label htmlFor="projectDescription" className="project-form__label">
              Project Description
            </label>
            <textarea
              type="text"
              name="projectDescription"
              id="projectDescription"
              required
            />
          </div>
          {/*End time*/}
          <div className="project-form__field">
            <label htmlFor="endTime" className="project-form__label">
                Project Finished Date
              </label>
            <input 
              type="datetime-local" 
              id="endTime" 
              name = "endTime"/>
          </div>
          {/*Visibility settings*/}
          <div className="project-form__field">
            <label htmlFor="visibilitySettings" className="project-form__label">
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
          {/*The rest of the fields are dynamic
          That is, we can add and remove text fields.
          Call the DynamicForm component!
          */
          }
          <div className="project-form__field">
            <label htmlFor="subject" className="project-form__label">
                Subject
              </label>
              <DynamicForm label="Subject" name="subject" items={subjects} setItems={setSubjects} type="text"/>
          </div>

          {/*Skills (has add more functionality)*/}
          <div className="project-form__field">
              <label htmlFor="skill" className="project-form__label">
                Add Skill
              </label>
              <DynamicForm label="Skill" name="skill" items={skills} setItems={setSkills} type="text"/>
            </div>
            {/*Tags (has add more functionality)*/}
            <div className="project-form__field">
              <label htmlFor="tag" className="project-form__label">
                Add Tag
              </label>
              <DynamicForm label="Tag" name="tag" items={tags} setItems={setTags} type="text"/>
            </div>
            {/*Files (has add more functionality)*/}
            <div className="project-form__field">
              <label htmlFor="file" className="project-form__label">
                Add File URL
              </label>
              <DynamicForm label="File" name="file" items={files} setItems={setFiles} type="url"/>
            </div>
        </div>

        <button type="submit" className="project-form__submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ProjectUpload;