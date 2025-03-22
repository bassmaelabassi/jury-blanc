import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const TaskResources = () => {
  const { projectId, taskId } = useParams()
  const [task, setTask] = useState(null)
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get(`http://localhost:7000/api/projects/${projectId}/tasks/${taskId}`)
        setTask(taskResponse.data)

        const resourcesResponse = await axios.get(`http://localhost:7000/api/projects/${projectId}/tasks/${taskId}/resources`)
        setResources(resourcesResponse.data)
      } catch (err) {
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId, taskId])

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) return <div className="text-center mt-20 text-white">Loading...</div>
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-800 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-200">
          <div className="bg-gradient-to-r from-gray-900 to-gray-900 p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Resources: {task.name}</h1>
            <p className="text-teal-100 mt-1">{task.description}</p>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link
            to={`/project/${projectId}/task/${taskId}/add-resource`}
            className="bg-amber-400 text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors shadow-sm"
          >
            Add Resource
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg">{resource.name}</h3>
                <div className="text-sm text-gray-600">Quantity: {resource.quantity}</div>
                <div className="text-sm text-gray-600">Type: {resource.type}</div>
                <div className="text-sm text-gray-600">Supplier: {resource.supplier}</div>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
                <Link to={`/project/${projectId}/task/${taskId}/edit-resource/${resource.id}`} className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200">
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm(`Are you sure you want to delete "${resource.name}"?`)) {
                      try {
                        await axios.delete(`http://localhost:7000/api/projects/${projectId}/tasks/${taskId}/resources/${resource.id}`)
                        setResources(resources.filter((res) => res.id !== resource.id))
                      } catch (err) {
                        alert("Failed to delete resource")
                      }
                    }
                  }}
                  className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/project/${projectId}/task/${taskId}/add-resource`}
          className={`fixed bottom-8 right-8 bg-amber-400 text-white p-4 rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300 flex items-center justify-center transform hover:scale-110 z-50 ${
            showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          Add
        </Link>
      </div>
    </div>
  )
}

export default TaskResources
