// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enroll from "./components/Enroll/Enroll";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProjectUpload from "./pages/ProjectUpload/ProjectUpload";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Profile from "./pages/Profile/Profile";
//import EditProfile from "./pages/Profile/EditProfile";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/enroll" element={<Enroll />} />

          <Route path="/profile" element={<Profile />} />
          {/*
            <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/delete" element={<EditProfile />} />
          */
          }


          {/*PROJECT ROUTES */}
          <Route path="/upload-project" element={<ProjectUpload />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/project/:id/edit" element={<ProjectDetails />} />
          <Route path="/project/:id/delete" element={<ProjectDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
