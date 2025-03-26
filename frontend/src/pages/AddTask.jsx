import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


const AddTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date cannot be in the past"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    resources: Yup.string().required("Resources are required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      resources: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          ...values,
          projectId: projectId,
          startDate: new Date(values.startDate),
          endDate: new Date(values.endDate)
        };

        const response = await axios.post(
          "http://localhost:9000/api/tasks",
          payload
        );

        if (response.status === 201) {
          navigate(`/project/${projectId}/tasks`);
        }
      } catch (error) {
        console.error("Task creation error:", error);
        if (error.response?.data?.errors) {
          const serverErrors = {};
          Object.keys(error.response.data.errors).forEach(key => {
            serverErrors[key] = error.response.data.errors[key].message;
          });
          setErrors(serverErrors);
        } else {
          alert(error.response?.data?.message || "Failed to create task");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Create New Task</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter task name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 min-h-[100px]"
                  placeholder="Describe the task details and requirements"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Resources</label>
                <input
                  type="text"
                  name="resources"
                  value={formik.values.resources}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  placeholder="Materials, equipment, etc."
                />
                {formik.touched.resources && formik.errors.resources && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.resources}</div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={() => navigate(`/project/${projectId}/tasks`)}
                className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500"
              >
                Back to Tasks
              </button>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Saving..." : "Save Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddTask;