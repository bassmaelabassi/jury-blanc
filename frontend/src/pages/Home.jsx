import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:7000/api/projects/${id}`);
        setProjects(projects.filter((project) => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Projects</h1>
            <p className="text-gray-600">Manage your construction projects</p>
          </div>
          <Link
            to="/add-project"
            className="bg-amber-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300"
          >
            New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-gray-700 to-gray-500 p-4">
                <h2 className="text-xl font-bold text-white mt-2">
                  {project.name}
                </h2>
              </div>

              <div className="p-5">
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center text-gray-700">
                    <div>
                      <span className="text-xs text-gray-500">
                        Project Duration
                      </span>
                      <p className="text-sm">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <div>
                      <span className="text-xs text-gray-500">Budget</span>
                      <p className="text-sm font-medium">
                        {project.budget} dh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/project/${project._id}/edit-project`}
                    className="flex-1 bg-amber-500 text-white px-10 rounded-lg hover:bg-amber-300 border-amber-200"
                  >
                    Edit
                  </Link>
                  <button
                    className="flex-1 bg-red-500 text-white rounded-lg hover:bg-red-400 border-red-500"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <Link
                  to={`/project/${project._id}/tasks`}
                  className="w-full bg-amber-400 text-white px-4 py-2.5 rounded-lg hover:bg-amber-500 transition-colors flex items-center justify-center font-medium"
                >
                  View Tasks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link
        to="/add-project"
        className={`fixed bottom-8 right-8 bg-amber-400 text-white p-4 rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300 flex items-center justify-center transform hover:scale-110 z-50 ${
          showFloatingButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        New Project
      </Link>
    </div>
  );
};

export default Home;
