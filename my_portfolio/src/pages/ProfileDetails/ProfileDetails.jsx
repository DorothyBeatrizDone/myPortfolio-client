import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;
import { getToken, checkAuth } from "../../utils/auth";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import "./ProfileDetails.scss";

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  //retrieve the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      console.log("token has", failedAuth);
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
        console.log("response.data", response.data);
        console.log("UserInfo", userInfo);
        console.log("UserInfo name", userInfo.name);
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

  if (failedAuth)  {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  return failedAuth ? (
    <p>Please log in to view profile information.</p>
  ) : (
    <div className="container">
    
    {/*Name */}
    <section>
      {userInfo.display_name ? (
        <h1>{userInfo.display_name}</h1>
      ) : (
        <h1>{userInfo.name}</h1>
      )}
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
        <ProfileAdd aKey = {about} aVal ={userInfo.about}/>
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
                  <ProfileEdit aKey = {skills} aVal={skill}/>
                }}> Edit </button>
                <button type = "button" onClick={() =>{
                  <ProfileAdd aKey = {skills} aVal={skill}/>
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
                  <ProfileEdit aKey = {languages_spoken} aState={language} stateVals = {languages}/>
                }}> Edit </button>
                <button type = "button" onClick={() =>{
                  <ProfileAdd aKey = {languages_spoken} aState={language} stateVals = {languages}/>
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
