import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseUrl = `http://${host}:${PORT}`;
const profileUrl = `${baseUrl}/users/profile`;

import "./Profile.scss";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);

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
        setUserInfo({ name: response.data.name });
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

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="container">
      <section>
        <h1>Welcome, {userInfo.name}!</h1>
      </section>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
