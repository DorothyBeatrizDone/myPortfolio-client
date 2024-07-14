import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import ProfileAdd from "../../components/ProfileAdd/ProfileAdd";

import "./ProfileDetails.scss";

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);
  //Diable or permits edits and additions, respectively.
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const [currentEditField, setCurrentEditField] = useState("");
  const [currentAddField, setCurrentAddField] = useState(false);

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

  const openAddModal = (field) => {
    setCurrentAddField(field);
    setAddModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  const closeAddModal = () =>{
    //if we already have an about section in place,
    //then this should be disabled.
    setAddModalOpen(false);

  }

  const handleDelete = async (field) => {
    try {
      const response = await axios.patch(profileUrl, { [field]: null }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
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
      <button type = "button" onClick={() =>{ openEditModal("display_name", (userInfo.display_name || userInfo.name))}}> Edit </button>
    </section>
      
    {/*About */}
    <section>
      <h2>About</h2>
      {userInfo.about && (
      <p>{userInfo.about || "No about section provided"}</p>
      )}
      <button type = "button" onClick={() =>{ openEditModal("about", userInfo.about || "")
      }}> Edit </button>
      {!userInfo.about && (
        <button type="button" onClick={() => openAddModal("about")}>Add</button>
      )}
      <button type="button" onClick={() => handleDelete("about")}>Delete About</button>

    </section>

    {/* Skills*/}
    <section>
      <h2>Skills</h2>
      <div className="project-info__tags">
        {userInfo.skills && userInfo.skills.map((skill,index) => (
          <div className="project-info__tag" key={index}>
            {skill}
          </div>
        ))}
      </div>
      <button onClick={() => openEditModal("skills", userInfo.skills || [])}>Edit</button>
      <button onClick={() =>openEditModal("skills")}>Add </button>
      <button type="button" onClick={() => handleDelete("skills")}>Delete Skills</button>

    </section>
    
    {/* Languages*/}
    <section>
      <h2>Languages</h2>
      <div className="project-info__tags">
        {userInfo.languages_spoken && userInfo.languages_spoken.map((language, index) => (
          <div className="project-info__tag" key={index}>
            {language}
          </div>
        ))}
      </div>

      <button onClick={() => openEditModal("languages_spoken", userInfo.languages_spoken || [])}>Edit</button>
      <button onClick={() => openEditModal("languages_spoken")}>Add</button>
      <button type="button" onClick={() => handleDelete("languages_spoken")}>Delete Languages</button>

    </section>
      
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      {editModalOpen && (
        <ProfileEdit 
          field = {currentEditField}
          value = {currentValue}
          closeModal = {closeModal}
          setUserInfo = {setUserInfo}
          userInfo = {userInfo}
          />
      )}
      {addModalOpen && (
        <ProfileAdd 
          field = {currentEditField}
          closeModal = {closeModal}
          setUserInfo = {setUserInfo}
          userInfo = {userInfo}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
