import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditResource = () => {
  const { projectId, taskId, resourceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/projects/${projectId}/tasks/${taskId}/resources/${resourceId}`)
      .then((response) => {
        formik.setValues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch resource data");
        setLoading(false);
      });
  }, [projectId, taskId, resourceId]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Resource name is required"),
    type: Yup.string().required("Resource type is required"),
    quantity: Yup.string().required("Quantity is required"),
    fournisseur: Yup.string().required("Supplier is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      quantity: "",
      fournisseur: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .put(`/api/projects/${projectId}/tasks/${taskId}/resources/${resourceId}`, values)
        .then(() => {
          navigate(`/project/${projectId}/task/${taskId}/resources`);
        })
        .catch(() => {
          setError("Failed to update resource");
        });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Edit Resource</h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formik.values).map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-2 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    placeholder={`Enter ${field}`}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={() => navigate(`/project/${projectId}/task/${taskId}/resources`)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Back to Resources
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResource;