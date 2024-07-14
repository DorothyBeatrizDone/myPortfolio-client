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

const ProfileAdd = ({field, closeModal, setUserInfo, userInfo}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [newValues, setNewValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  //const [languages, setLanguages] = useState([]);
  //const [skillSet, setSkillSet] = useState([]);
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
      let addedValue;
      if (field === "about"){
        //the about section is a string, but newValues is an array
        addedValue = newValues.join(",");
      }
      else{
        //get all the elements of the array for that given field
        //example skills = [a, b, c]
        if (userInfo[field].length === 0){
          addedValue  = [...newValues];
        }
        else{
          //add the newValues to the back of the array
          addedValue = [...(userInfo[field]), ...newValues];
        }
      }


      //get the field we want to add
      //get the information associated with that field
      //example. response.data.field
      //but the latest information is held in userInfo, which was passed as a param
      //
      /*

*/
      const addedSection = {[field] : addedValue};
      try {
        const response  = await axios.post(profileUrl, addedSection, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        /*
        if (aKey === languages_spoken ){
            setSkills([]);
        }
        if (aKey === languages_spoken){
            setLanguages([]);
        }
        navigate("/profile")
        */
       setUserInfo(response.data);
       closeModal();
      } catch (error) {
        setError('Error creating a new profile.');
      }
    }
    handleAddForm();
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
    <section className="add-section">
      <form className="project-form" onSubmit={handleAddForm}>
          <label htmlFor={field}>{field}</label>
            {/*About */}
            {field === "about" ? (
                <input
                    className="project-form__input-field"
                    placeholder='About section'
                    type="text"
                    name={field}
                    id={field}
                    maxLength="300"
                    value = {newValues}
                    onChange = {(e) => setNewValues([e.target.value])}
                />
                ):(
                  <DynamicForm label={field} name={field} items={newValues} setItems={setNewValues} type="text"/>
                )}
              <button type="submit" className="project-form__submit">Confirm</button>
          </form>
    </section>
  );
};

export default ProfileAdd;
