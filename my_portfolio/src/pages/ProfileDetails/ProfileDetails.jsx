import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import "./ProfileDetails.scss";

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);
 // const [skillSet, setSkillSet] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditField, setCurrentEditField] = useState("");
  const [currentValue, setCurrentValue] = useState("");
 // const [languages, setLanguages] = useState([]);

  //retrieve the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setUserInfo({});
    setFailedAuth(true);
  };

  const openEditModal = (field, value) => {
    setCurrentEditField(field);
    setCurrentValue(value);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return failedAuth ? (
    <main>
      <p>You must be logged in to see this page.</p>
      <p>
        <Link to="/login">Log in</Link>
      </p>
  </main>
  ) : isLoading ? (<h1> Loading...</h1>) : (
    <div className="container">
    
    {/*Name */}
    <section>
        <h1>{userInfo.display_name || userInfo.name}</h1>
      <button type = "button" onClick={() =>{
        <ProfileEdit aKey = {display_name} aVal = {userInfo.display_name} />
      }}> Edit </button>

  </section>
      
    {/*About */}
    <section>
      <h2>About</h2>
      {userInfo.about && (
      <p>{userInfo.about}</p>
      )}
      <button type = "button" onClick={() =>{
        <ProfileEdit aKey = {about} aVal ={userInfo.about}/>
      }}> Edit </button>
      <button type = "button" onClick={() =>{
        <ProfileAdd aKey = {about}/>
      }}> Add </button>
    </section>

    {/* Skills*/}
    <section>
      <h2>Skills</h2>
      {userInfo.skills && (
        <div className="project-info__tags">
          {userInfo.skills.map((skill) => (
            <div className="project-info__tag" key={project.id}>
                {skill}
                <button type = "button" onClick={() =>{
                  <ProfileEdit aKey = {skills} aVal={skill} stateVals={skillSet}/>
                }}> Edit </button>
                <button type = "button" onClick={() =>{
                  <ProfileAdd aKey = {skills}/>
                }}> Add </button>
            </div>
            ))}
        </div>
      )}
    </section>
    
    {/* Languages*/}
    <section>
      <h2>Languages</h2>
      {userInfo.languages_spoken && (
        <div className="project-info__tags">
          {userInfo.languages_spoken.map((language) => (
            <div className="project-info__tag" key={project.id}>
                {language}
                <button type = "button" onClick={() =>{
                  <ProfileEdit aKey = {languages_spoken} aVal={language} stateVals = {languages}/>
                }}> Edit </button>
                <button type = "button" onClick={() =>{
                  <ProfileAdd aKey = {languages_spoken} />
                }}> Add </button>
            </div>
            ))}
        </div>
      )}
    </section>
      
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileDetails;
