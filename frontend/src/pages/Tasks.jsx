import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/projects/${projectId}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("Error fetching project:", err));

    axios.get(`http://localhost:9000/api/tasks/project/${projectId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [projectId]);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {project ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-200">
            <div className="bg-gray-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">{project.name}</h1>
                    <p className="text-amber-100 mt-1">{project.description}</p>
                  </div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                  <div className="text-xs text-amber-100">Project Duration</div>
                  <div className="flex items-center">
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Loading project...</p>
        )}

        <div className="flex flex-wrap gap-2 w-full mb-5 sm:w-auto">
          <Link
            to={`/project/${projectId}/add-task`}
            className="bg-amber-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-amber-500 transition-colors ml-auto"
          >
            <span>New Task</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{task.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
                </div>

                <div className="px-4 py-3 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <div className="text-xs text-gray-500">Start Date</div>
                      <div className="font-medium text-gray-700">{task.startDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">End Date</div>
                      <div className="font-medium text-gray-700">{task.endDate}</div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <Link
                      to={`/project/${projectId}/task/${task._id}/resources`}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 border border-blue-200"
                    >
                      <span>Resources ({task.resources})</span>
                    </Link>
                    <div className="flex gap-2">
                      <Link
                        to={`/project/${projectId}/task/${task._id}/edit-task`}
                        className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center border border-amber-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${task.name}"?`)) {
                            axios.delete(`http://localhost:9000/api/tasks/${task._id}`)
                              .then(() => setTasks(tasks.filter(t => t._id !== task._id)))
                              .catch(err => console.error("Error deleting task:", err));
                          }
                        }}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center border border-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;