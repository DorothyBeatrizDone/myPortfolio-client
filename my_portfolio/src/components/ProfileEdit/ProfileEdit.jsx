import { useState, useEffect } from "react";
import axios from "axios";
import DynamicForm from "../DynamicForm/DynamicForm"
import { Link, useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
import backArrow from "../../assets/images/arrow_back.png";
import "./ProfileEdit.scss"

// Profit Edit will either modify (save button) or delete the section
const profileUrl = `${baseUrl}/users/profile`;

const ProfileEdit = ({aKey, aVal, stateVals}) => {
  const navigate = useNavigate();
  const [error, setError] = useSate("");
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);

  //retrieve the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleEditForm = async(e)=>{
      e.preventDefault();
      const token = sessionStorage.getItem("JWTtoken");

      let uploadedProfileForm = {};
      if (aKey === display_name){
        uploadedProfileForm.display_name = aVal;
      }
      else if (aKey === about){
        uploadedProfileForm.about = aVal;
      }
      else if(aKey === skills){
        uploadedProfileForm.skills = [...stateVals, aVal];
      }
      else{
        uploadedProfileForm.languages_spoken = [...stateVals, aVal];
      }
      try {
        await axios.patch(profileUrl, uploadedProfileForm, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate("./profile")
        //should we navigate somewhere??
      } catch (error) {
        setError('Error editing.');
      }
    }
    handleEditForm();
  },[token]);

  if (failedAuth) {
    return (
      <main className="profile">
        <p>You must be logged in to view your profile</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="create-project">
        <div className='create-project__header'>
            <div className = "create-project__title-section">
              <img
                className="create-project__header-arrow"
                src={backArrow}
                alt="back arrow"
                onClick={() => navigate('/dashboard')}
              />
              <h1 className="create-project__title">My Profile</h1>
            </div>
          </div>
      <form className="project-form" onSubmit={handleProfileForm}>
        <div className="project-form__fields">
          {/*About */}
          <div className="project-form__field">
            <label htmlFor="about" className="project-form__label">
              About
            </label>
            <input
              className="project-form__input-field"
              placeholder='About section'
              type="text"
              name="about"
              id="about"
              maxLength="300"
            />
          </div>
          {/*Skills */}
          <div className="project-form__field">
              <label htmlFor="skill" className="project-form__label">
                Skills
              </label>
              <DynamicForm label="Skills" name="skills" items={skills} setItems={setSkills} type="text"/>
            </div>

            {/*Languages */}
            <div className="project-form__field">
              <label htmlFor="languages" className="project-form__label">
                Languages
              </label>
              <DynamicForm label="Languages" name="languages" items={languages} setItems={setLanguages} type="text"/>
            </div>
        </div>

        <button type="submit" className="project-form__submit">
          Submit profile information
        </button>
      </form>
    </section>
  );
};

export default ProfileEdit;
