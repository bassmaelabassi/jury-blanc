import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject"; 
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskResources from "./pages/TaskResources";
import AddResourceToTask from "./pages/ADDResourceToTask";
import EditResource from "./pages/EditResource";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:projectId/tasks" element={<Tasks />} /> 
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/project/:projectId/add-task" element={<AddTask />} />
            <Route path="/project/:projectId/task/:taskId/resources" element={<TaskResources />} />
            <Route path="/project/:projectId/task/:taskId/add-resource" element={<AddResourceToTask />} />
            <Route path="/project/:projectId/task/:taskId/edit-resource/:resourceId" element={<EditResource />} />
            <Route path="/project/:projectId/task/:taskId/edit-task" element={<EditTask />} />
            <Route
              path="/project/:projectId/edit-project"
              element={<EditProject />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;   