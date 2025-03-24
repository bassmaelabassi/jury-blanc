import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddResourceToTask = () => {
  const { projectId, taskId } = useParams();

  const validationSchema = Yup.object({
    name: Yup.string().required("Resource name is required"),
    type: Yup.string().required("Resource type is required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .positive("Quantity must be positive"),
    supplier: Yup.string().required("Supplier is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      quantity: "",
      supplier: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `http://localhost:6000/api/projects/${projectId}/tasks/${taskId}/resources`,
          values
        );
        console.log("Resource added successfully:", response.data);
        alert("Resource added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error adding resource:", error.response?.data || error.message);
        alert("Failed to add resource. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Resource to Task</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Resource Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-400 focus:border-amber-400"
              placeholder="Enter resource name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Resource Type</label>
            <input
              type="text"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-400 focus:border-amber-400"
              placeholder="Enter resource type"
            />
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-sm">{formik.errors.type}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-400 focus:border-amber-400"
              placeholder="Enter quantity"
              min="0"
              step="0.01"
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formik.values.supplier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-400 focus:border-amber-400"
              placeholder="Enter supplier name"
            />
            {formik.touched.supplier && formik.errors.supplier && (
              <div className="text-red-500 text-sm">{formik.errors.supplier}</div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
            >
              Back to Resources
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceToTask;
