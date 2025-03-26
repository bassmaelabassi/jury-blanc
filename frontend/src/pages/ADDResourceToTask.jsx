import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProject = () => {
  const { projectId, taskId } = useParams()
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("resource title is required"),
    type: Yup.string().required("type is required"),
    description: Yup.string().required("description is required"),
    supplier: Yup.string().required("supplier is required"),
    quantity: Yup.number()
      .typeError("Budget must be a number")
      .required("Budget is required")
      .positive("Budget must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      quantity: "",
      description: "",
      supplier: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {

        const payload = {
          ...values,
          taskId: taskId,
        };
        
        await axios.post("http://localhost:9000/api/resources", payload);
        navigate(`/project/${projectId}/task/${taskId}/resources`);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Create New resource</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[ 
            { label: "Title", name: "title", type: "text" },
            { label: "Type", name: "type", type: "text" },
            { label: "Quantity", name: "quantity", type: "number" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "supplier", name: "supplier", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name="description"
                  value={formik.values.description}
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
            <Link to={`/project/${projectId}/task/${taskId}/resources`}>
              <button
                type="button"
                className="px-6 py-2 bg-amber-400 text-gray-700 rounded-lg hover:bg-amber-200"
              >
                Back to tasks
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-400 text-gray-700 rounded-lg hover:bg-amber-200"
            >
              Save Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;