import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditTask = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const taskData = {
    id: taskId,
    name: "Task 1",
    description: "Description of Task 1",
    startDate: "2025-05-01",
    endDate: "2025-06-01",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  const formik = useFormik({
    initialValues: taskData,
    validationSchema,
    onSubmit: (values) => {
      console.log("Updated task:", values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gray-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Edit Task</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 py-3 border border-gray-300 "
                  placeholder="Enter task name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300"
                  placeholder="Describe the task details and requirements"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-4 py-3 border border-gray-300"
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-4 py-3 border border-gray-300"
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <button
                onClick={() => navigate(`/project/${projectId}/tasks`)}
                className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500"
              >
                Back to Tasks
              </button>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500"
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

export default EditTask;
