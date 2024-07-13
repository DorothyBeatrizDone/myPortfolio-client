import { useState, useEffect } from "react";
import axios from "axios";
import DynamicForm from "../DynamicForm/DynamicForm"
import { Link, useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
import backArrow from "../../assets/images/arrow_back.png";
import "./ProfileEdit.scss"

const profileUrl = `${baseUrl}/users/profile`;

const ProfileAdd = ({aKey, stateVals}) => {
  const navigate = useNavigate();
  const [error, setError] = useSate("");
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  //retrieve the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }

    //FORM FOR USER TO INPUT PERSONAL INFORMATION
    const handleAddForm = async(e)=>{
      e.preventDefault();
      const token = sessionStorage.getItem("JWTtoken");

      let addedSection = {};

      if (aKey === about){
        addedSection.about = e.target.about.value;
      }
      else if(aKey === skills){
        addedSection.skills = skillSet;

      }
      else{
        addedSection.languages_spoken = languages;
      }


      try {
        await axios.post(profileUrl, addedSection, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        e.target.reset();
        if (aKey === languages_spoken ){
            setSkills([]);
        }
        if (aKey === languages_spoken){
            setLanguages([]);
        }
        navigate("/profile")
      } catch (error) {
        setError('Error creating a new profile.');
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
                onClick={() => navigate('/profile')}
              />
              <h1 className="create-project__title">Add to your profile</h1>
            </div>
        </div>
      <form className="project-form" onSubmit={handleProfileForm}>
        <div className="project-form__fields">
            {/*About */}
            {aKey === about && (
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
            )}
            {/*Skills */}
            {aKey === skills && (
            <div className="project-form__field">
                <label htmlFor="skill" className="project-form__label">
                    Skills
                </label>
                <DynamicForm label="Skills" name="skills" items={skillSet} setItems={setSkillSet} type="text"/>
                </div>
            )}
            {/*Languages */}
            {aKey === languages_spoken && (
            <div className="project-form__field">
                <label htmlFor="languages" className="project-form__label">
                Languages
                </label>
                <DynamicForm label="Languages" name="languages" items={languages} setItems={setLanguages} type="text"/>
            </div>
            )}
        </div>

        <button type="submit" className="project-form__submit">
          Confirm
        </button>
      </form>
    </section>
  );
};

export default ProfileAdd;
