// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enroll from "./components/Enroll/Enroll";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProjectUpload from "./pages/ProjectUpload/ProjectUpload";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProfileDetails from "./pages/ProfileDetails/ProfileDetails";
import ProfileAdd from "./components/ProfileAdd/ProfileAdd";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import ProjectEdit from "./components/ProjectEdit/ProjectEdit";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/enroll" element={<Enroll />} />

          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/profile/edit" element={<ProfileEdit  />} />
          <Route path="/profile/add" element={<ProfileAdd />} />



          {/*PROJECT ROUTES */}
          <Route path="/upload-project" element={<ProjectUpload />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/project/:id/edit" element={<ProjectEdit />} />
          <Route path="/project/:id/delete" element={<ProjectEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
