import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditResource = () => {
  const { projectId, taskId, resourceId } = useParams();

  const resourceData = {
    id: resourceId,
    name: "Man",
    type: "transport",
    quantity: "100ps",
    fournisseur: "FSTP",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Resource name is required"),
    type: Yup.string().required("Resource type is required"),
    quantity: Yup.string().required("Quantity is required"),
    fournisseur: Yup.string().required("Supplier is required"),
  });

  const formik = useFormik({
    initialValues: resourceData,
    validationSchema,
    onSubmit: (values) => {
      console.log("Updated resource:", values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Edit Resource</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Resource Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                  placeholder="Enter resource name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                  placeholder="Enter resource type"
                />
                {formik.touched.type && formik.errors.type && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                  placeholder="Enter quantity"
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.quantity}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Supplier (Fournisseur)</label>
                <input
                  type="text"
                  name="fournisseur"
                  value={formik.values.fournisseur}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                  placeholder="Enter supplier name"
                />
                {formik.touched.fournisseur && formik.errors.fournisseur && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.fournisseur}</div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <Link
                to={`/project/${projectId}/task/${taskId}/resources`}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Back to Resources
              </Link>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResource;
