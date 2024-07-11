import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const SERVER_URL = `http://${host}:${PORT}`;

//IMPORTANT
//        subject: subject.value.split(',').map(item => item.trim()),


const ProjectUpload = ({onProjectCreate}) => {


  //TBC, I am going to work now on something else. 
  //Things to fix: list of skills and list of subjects, adding them in the form of tags.
  //Also, I think I need to pass the user_id here. How do I get that again?
  //no, we don't pass the id, but the backend has req.user.id... remember to print req. where
  //does req.user come in?

  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  //despite it's confusing name in the DB, subject is actaully a list
  //note that it is written in JSON format!!
  const [subjects, setSubjects] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const { postTitle, projectUrl, endTime, visibilitySettings, subject, skill, projectDescription } = e.target;
    const token = localStorage.getItem('JWTtoken');
    if (!token) {
      setFailedAuth(true);
      return;
    }

    //Collect the user input 
    const uploadedForm = {
      title: e.target.postTitle.value,
      project_url: e.target.projectUrl.value,
      end_time: e.target.endTime.value,
      visibility: e.target.visibilitySettings.value, 
      skills: e.target.skills.value,
      subject: e.target.subject.value,
      tags: e.target.tags.value,
      files:e.target.files.value,
      description: e.target.projectDescription.value,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/projects/`,
          uploadedForm, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        onProjectCreate();
        e.target.reset();
    } catch (error) {
        setError('Error creating a new project.');
    }
    // Post to API (remember to use `withCredentials`)

  return (
    <section className="create-post">
      <form className="post-form" onSubmit={handleFormSubmit}>
        <h3>Create New Post</h3>
        <div className="post-form__fields">
          {/*Title */}
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
          {/*URL*/}
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
          {/*Description*/}
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
          {/*End time*/}
          <div className="post-form__field">
            <label htmlFor="endTime" className="post-form__label">
                Project Finished Date
              </label>
            <input 
              type="datetime-local" 
              id="endTime" 
              name = "endTime"/>
          </div>
          {/*Visibility settings*/}
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
          {/*The rest of the fields are dynamic
          That is, we can add and remove text fields.
          Call the DynamicForm component!
          */
          }
          <div className="post-form__field">
            <label htmlFor="subject" className="post-form__label">
                Subject
              </label>
              <DyanmicForm label="Subject" name="subject" item={subjects} setItems={setSubjects} type="text"/>
          </div>

          {/*Skills (has add more functionality)*/}
          <div className="post-form__field">
              <label htmlFor="skill" className="post-form__label">
                Add Skill
              </label>
              <DyanmicForm label="Skill" name="skill" item={skills} setItems={setSkills} type="text"/>
            </div>
            {/*Tags (has add more functionality)*/}
            <div className="post-form__field">
              <label htmlFor="tag" className="post-form__label">
                Add Tag
              </label>
              <DyanmicForm label="Tag" name="tag" item={tags} setItems={setTags} type="text"/>
            </div>
            {/*Files (has add more functionality)*/}
            <div className="post-form__field">
              <label htmlFor="file" className="post-form__label">
                Add File URL
              </label>
              <DyanmicForm label="File" name="file" item={files} setItems={setFiles} type="url"/>
            </div>
        </div>

        <button type="submit" className="post-form__submit">
          Submit
        </button>
      </form>
    </section>
  );
    };
};

export default ProjectUpload;