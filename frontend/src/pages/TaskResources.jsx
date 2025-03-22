import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const TaskResources = () => {
  const { projectId, taskId } = useParams()
  const navigate = useNavigate()
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true)
      } else {
        setShowFloatingButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const project = {
    id: projectId,
    name: "Build Hospital",
  }

  const task = {
    id: taskId,
    name: "Foundation Excavation",
    description: "Excavate the site and prepare foundation base",
    startDate: "01/05/2025",
    endDate: "15/05/2025",
  }

  const resources = [
    {
      id: 1,
      name: "Construction Workers",
      type: "Labor",
      quantity: "12 workers",
      supplier: "ManpowerPlus",
    },
    {
      id: 2,
      name: "Cement",
      type: "Material",
      quantity: "500 kg",
      supplier: "Cemex",
      cost: "$1,200",
      notes: "High-grade Portland cement",
    },
    {
      id: 3,
      name: "Excavator",
      type: "Equipment",
      quantity: "2 units",
      supplier: "HeavyMachinery Inc.",
      cost: "$800/day",
      notes: "Medium-sized excavators with operators",
    },
    {
      id: 4,
      name: "Steel Reinforcement",
      type: "Material",
      quantity: "2 tons",
      supplier: "SteelWorks",
      cost: "$3,200",
      notes: "Grade 60 rebar for foundation",
    },
    {
      id: 5,
      name: "Concrete Mixer Truck",
      type: "Equipment",
      quantity: "1 unit",
      supplier: "ConcreteSupply Co.",
      cost: "$450/day",
      notes: "10 cubic meter capacity",
    },
    {
      id: 6,
      name: "Safety Equipment",
      type: "Tool",
      quantity: "15 sets",
      supplier: "SafetyFirst",
      cost: "$750",
      notes: "Helmets, vests, boots, and gloves",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-800 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-200">
          <div className="bg-gradient-to-r from-teal-500 to-teal-800 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  Back
                </button>
                <div>
                  <div className="text-teal-100 text-sm mb-1">Project: {project.name}</div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Resources: {task.name}</h1>
                  <p className="text-teal-100 mt-1">{task.description}</p>
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                <div className="text-xs text-teal-100">Task Duration</div>
                <div className="flex items-center">
                  <span>{task.startDate} - {task.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link
            to={`/project/${projectId}/task/${taskId}/add-resource`}
            className="bg-amber-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-amber-500 transition-colors shadow-sm"
          >
            <span>Add Resource</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="mr-3 p-2 rounded-lg bg-gray-100"></div>
                  <h3 className="font-bold text-gray-800 text-lg">{resource.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Quantity</div>
                    <div className="font-medium text-gray-700">{resource.quantity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Type</div>
                    <div className="font-medium text-gray-700">{resource.type}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">Supplier</div>
                    <div className="font-medium text-gray-700">{resource.supplier}</div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
                <Link
                  to={`/project/${projectId}/task/${taskId}/edit-resource/${resource.id}`}
                  className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1 border border-amber-200"
                >
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => confirm(`Are you sure you want to delete "${resource.name}"?`)}
                  className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 border border-red-200"
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link
          to={`/project/${projectId}/task/${taskId}/add-resource`}
          className={`fixed bottom-8 right-8 bg-amber-400 text-white p-4 rounded-full shadow-lg hover:bg-amber-200 transition-all duration-300 flex items-center justify-center transform hover:scale-110 z-50 ${showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        >
          <span>Add</span>
        </Link>
      </div>
    </div>
  )
}

export default TaskResources
