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

  const validationSchema = Yup.object({
    title: Yup.string().required("Resource name is required"),
    type: Yup.string().required("Resource type is required"),
    quantity: Yup.string().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    supplier: Yup.string().required("Supplier is required"),
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
      axios
        .put(`http://localhost:9000/api/resources/${resourceId}`, values)
        .then(() => {
          navigate(`/project/${projectId}/task/${taskId}/resources`);
        })
        .catch(() => {
          setError("Failed to update resource");
        });
    },
  });

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/resources/${resourceId}`);
        formik.setValues(response.data);
      } catch (err) {
        console.error("Error fetching resource:", err);
        setError("Failed to load resource. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [projectId, taskId, resourceId]);

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
            <div>
                <label className="block text-gray-700 font-medium mb-2">Resource title</label>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300"
                  placeholder="Enter Resource title"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                )}

                <label className="block text-gray-700 font-medium mb-2">type</label>
                <input
                  type="text"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300"
                  placeholder="Enter resource type"
                />
                {formik.touched.type && formik.errors.type && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>
                )}

                <label className="block text-gray-700 font-medium mb-2">quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300"
                  placeholder="Enter resource quantity"
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.quantity}</div>
                )}

                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300"
                  placeholder="Enter resource description"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                )}

                <label className="block text-gray-700 font-medium mb-2">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formik.values.supplier}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300"
                  placeholder="Enter resource supplier"
                />
                {formik.touched.supplier && formik.errors.supplier && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.supplier}</div>
                )}
              </div>
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