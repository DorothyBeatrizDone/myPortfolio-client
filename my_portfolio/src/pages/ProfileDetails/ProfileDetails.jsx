import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;

import "./ProfileDetails.scss";

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);
  const [currentEditField, setCurrentEditField] = useState("");
  const [currentValue, setCurrentValue] = useState("");
 
  // const [languages, setLanguages] = useState([]);

  //retrieve the JWT token from the session storage
  const token = sessionStorage.getItem("JWTtoken");

  const navigate = useNavigate();

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
    navigate(`/profile/edit?field=${field}&value=${encodeURIComponent(value)}`);
  };

  const openAddModal = (field, value) => {
    setCurrentEditField(field);
    setCurrentValue(value);
    //https://reactnavigation.org/docs/use-navigation-state/
    //For lists, we need to have a current account of the elements in the list.
    navigate(`/profile/add?field=${field}&value=${encodeURIComponent(value)}`)
  };
  console.log("userInfo", userInfo);
  console.log("userInfo.skills", userInfo.skills);

  
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
        openEditModal("display_name", (userInfo.display_name || userInfo.name))}}> Edit </button>
    </section>
      
    {/*About */}
    <section>
      <h2>About</h2>
      {userInfo.about && (
      <p>{userInfo.about || "No about section provided"}</p>
      )}
      <button type = "button" onClick={() =>{ openEditModal("about", userInfo.about || "") }}> Edit </button>
      {!userInfo.about && (<button type="button" onClick={() => openAddModal("about", "")}>Add</button> )}
    </section>

    {/* Skills*/}
    <section>
      <h2>Skills</h2>
      <div className="project-info__tags">
        {userInfo.skills && userInfo.skills.split(",").map((skill,index) => (
          <div className="project-info__tag" key={index}>
            {skill}
          </div>
        ))}
      </div>
      <button onClick={() => openEditModal("skills", userInfo.skills || [])}>Edit</button>
      <button onClick={() => openAddModal("skills", userInfo.skills || [])}>Add</button>
    </section>
    
    {/* Languages*/}
    <section>
      <h2>Languages</h2>
      <div className="project-info__tags">
        {userInfo.languages_spoken && userInfo.languages_spoken.split(",").map((language, index) => (
          <div className="project-info__tag" key={index}>
            {language}
          </div>
        ))}
      </div>

      <button onClick={() => openEditModal("languages_spoken", userInfo.languages_spoken || [])}>Edit</button>
      <button onClick={() => openAddModal("languages_spoken", userInfo.languages_spoken || [])}>Add</button>

    </section>
      
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileDetails;
