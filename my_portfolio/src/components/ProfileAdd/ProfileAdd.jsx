import { useState, useEffect } from "react";
import axios from "axios";
import DynamicForm from "../DynamicForm/DynamicForm"
import { useLocation, useNavigate } from "react-router-dom";
import backArrow from "../../assets/images/arrow_back.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import add_icon from "../../assets/images/add_icon.png"

const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;

const profileUrl = `${baseUrl}/users/profile`;
  //FORM FOR USER TO INPUT PERSONAL INFORMATION

const ProfileAdd = ({setUserInfo, userInfo}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query  = new URLSearchParams(location.search);
  const field = query.get("field");
  const values = query.get("value");

  //remember to add this to utilities!
  const processLists = (elems) =>{
    if (!elems) return [];
    if (elems.length === 1) return [elems];
    return elems.split(",");
  };

  const valsList  = processLists(values);
  const [addedValues, setAddedValues] = useState(valsList);

  //addedValues are now lists!

  //console.log("the query is", query);
  //console.log('the new field is ', field);

  //console.log("inside profile add type field", typeof(field));
  // console.log("stringified field", JSON.stringify(field));

  console.log("addedValues", addedValues); //coming in as a string??

  const [newValues, setNewValues] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  
  const token = sessionStorage.getItem("JWTtoken");
  //console.log(token);
  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      return;
    }
    setIsLoading(false);
  }, [token]);

  const handleAddForm = async(e)=>{
    e.preventDefault();
    let addedValue;

    //console.log("just below add form userInfo", userInfo)
    if (field == "about"){
      //the about section is a string, but newValues is an array
      addedValue = newValues.join(",");
      //console.log("inside about condition")
    }
    //get all the elements of the array for that given field
    //example skills = [a, b, c]
    else{
      //get all the elements of the array for that given field
      //example skills = [a, b, c]
      //console.log("userInfo", userInfo);
      
      if (!addedValues) {
        //there are no current values for that field.
        addedValue = [...newValues];
        console.log("no values in list then", addedValue);
        //console.log("added values ", addedValue)
      } else {
        //add the newValues to the back of the array
        addedValue = [...addedValues, ...newValues];
        console.log("values already in list then", addedValue);

      }
        

      //!userInfo[field]
    }
    //console.log("addedValue outside all the if and elses", addedValue );
    
    //get the field we want to add. Get the information associated with that field
    //Example. response.data.field. The latest information is held in userInfo, which was passed as a param

    const addedSection = {[field] : addedValue};
    try {
      const response  = await axios.patch(profileUrl, addedSection, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      //console.log("bottom handleAddForm")
      setUserInfo(response.data);
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      setError('Error creating a new profile.');
    }
  };
  
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

  return (
    <>
    <Header/>
      <section className="project-form__fields">
          <div className = "create-project__header">
              <img
                className="profile__icon"
                src={backArrow}
                alt="back arrow"
                onClick={() => navigate('/profile')}
              />
              <h1 className="dashboard__title">Add {field}</h1>
          </div>

        <form className="form" onSubmit={handleAddForm}>
              {/*About */}
              {field == "about" ? (
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
                <button type="submit" className="project-form__submit">Submit added details</button>
        </form>
    </section>
    <Footer/>
    </>

  );
};

export default ProfileAdd;
