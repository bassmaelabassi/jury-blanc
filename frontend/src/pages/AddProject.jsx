import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProject = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Project name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    budget: Yup.number()
      .typeError("Budget must be a number")
      .required("Budget is required")
      .positive("Budget must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:7000/api/projects", values);
        navigate("/");
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Create New Project</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[ 
            { label: "Project Name", name: "name", type: "text" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "End Date", name: "endDate", type: "date" },
            { label: "Budget (Dh)", name: "budget", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              )}
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <Link to="/">
              <button
                type="button"
                className="px-6 py-2 bg-amber-400 text-gray-700 rounded-lg hover:bg-amber-200"
              >
                Back to Projects
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-400 text-gray-700 rounded-lg hover:bg-amber-200"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
