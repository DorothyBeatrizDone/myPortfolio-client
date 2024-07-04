// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enroll from "./components/Enroll/Enroll";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import ProjectUpload from "./components/ProjectUpload/ProjectUpload";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-project" element={<ProjectUpload />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
