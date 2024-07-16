import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import add_icon from "../../assets/images/add_icon.png";
import edit_icon from "../../assets/images/edit_icon.png"

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
    console.log("openAddModal value before", value); //undefined
    console.log("Array.isArray(value)", Array.isArray(value));

    Array.isArray(value) ? (setCurrentValue(value)) : ("");
    console.log("openAddModal value after", value);
    //https://reactnavigation.org/docs/use-navigation-state/
    //For lists, we need to have a current account of the elements in the list.
    navigate(`/profile/add?field=${field}&value=${value}`)
  };

  //function processes strings to lists
  /* a -> [a]
  _ -> []
  a,b -> [a,b]*/
  const processLists = (elems) =>{
    if (!Array.isArray(elems)){
      if (!elems) return [];
      else if (elems.length === 1) return [elems];
      else return elems.split(",")
    }
    return elems;
  };
  

  console.log("userInfo", userInfo);
  console.log("userInfo.skills", userInfo.skills);
  const userSkills = processLists(userInfo.skills);
  const userLanguages = processLists(userInfo.languages_spoken);

  console.log("userInfo.languages_spoken", userInfo.languages_spoken);
  console.log("userSkills", userSkills);
  //console.log("userInfo.skills includes", userInfo.skills.includes(","));

  console.log("userLanguages", userLanguages);
 // console.log("userInfo.languages_spoken", userInfo.languages_spoken.includes(","));

  //console.log("userInfo.languages_spoken with split", userInfo.languages_spoken.split(" "));

  return failedAuth ? (
    <main>
      <p>You must be logged in to see this page.</p>
      <p>
        <Link to="/login">Log in</Link>
      </p>
  </main>
  ) : isLoading ? (<h1> Loading...</h1>) : (
    <div className="container">
      <Header/>
      <div className="project-form__fields">
        <div className="create-project__header">
          <h1 className="dashboard__title">Your Profile Details</h1>
        </div>
        {/*Name */}
        <section className="project-form__field">
          <div>
            <h2 className="project-info__label">{userInfo.display_name || userInfo.name}</h2>
          </div>
          <div className="project-form__icons">
            <img
              src={edit_icon}
              alt="Edit"
              className="profile__icon"
              onClick={() => openEditModal("display_name", (userInfo.display_name || userInfo.name))}
            />
          </div>
        </section>
          
        {/*About */}
        <section className="project-form__field">
          <div>
            <h2 className="project-info__label">About</h2>
            {userInfo.about && (
            <p>{userInfo.about || "No about section provided"}</p>
            )}
          </div>
          <div className="project-form__icons">
            <img
              src={edit_icon}
              alt="Edit"
              className="profile__icon"
              onClick={() => openEditModal("about", userInfo.about || "")}
            />
            {!userInfo.about && (
              <img
                src={add_icon}
                alt="Add"
                className="profile__icon"
                onClick={() => openAddModal("about", "")}
            />
            )}
          </div>

        </section>

        {/* Skills*/}
        <section className="project-form__field">
          <div>
            <h2 className="project-info__label">Skills</h2>
              <div className="project-info__tags">
                {userInfo.skills && userSkills.map((skill,index) => (
                  <div className="button-add" key={index}>
                    {skill}
                  </div>
                ))}

              </div>
          </div>

          <div className="project-form__icons">
            <img
                src={edit_icon}
                alt="Edit"
                className="profile__icon"
                onClick={() => openEditModal("skills", userSkills)}
              />
              <img
                src={add_icon}
                alt="Add"
                className="profile__icon"
                onClick={() => openAddModal("skills", userSkills)}
              />
          </div>
        </section>
        
        {/* Languages*/}
        <section className="project-form__field">
          <div >
            <h2 className="project-info__label">Languages</h2>
            <div className="project-info__tags">
              {userInfo.languages_spoken && userLanguages.map((language, index) => (
                <div className="button-add" key={index}>
                  {language}
                </div>
              ))}
            </div>

          </div>

          <div className="project-form__icons">
            <img
              src={edit_icon}
              alt="Edit"
              className="profile__icon"
              onClick={() => openEditModal("languages_spoken", userInfo.languages_spoken || [])}
            />

            <img
              src={add_icon}
              alt="Add"
              className="profile__icon"
              onClick={() => openAddModal("languages_spoken", userLanguages)}
            />
          </div>
        </section>
      </div>

      {/*
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      */}
      <Footer/>
    </div>
  );
};

export default ProfileDetails;
