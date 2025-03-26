import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

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
      name: project?.name || "",
      description: project?.description || "",
      startDate: project?.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "",
      endDate: project?.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "",
      budget: project?.budget || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:9000/api/projects/${projectId}`, values);
        navigate("/");
      } catch (error) {
        console.error("Error updating project:", error);
      }
    },
  });

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Project</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Project Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter project name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[100px]"
              placeholder="Describe the project"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Budget (Dh)</label>
            <input
              type="number"
              name="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter budget amount"
            />
            {formik.touched.budget && formik.errors.budget && (
              <div className="text-red-500 text-sm">{formik.errors.budget}</div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 "
            >
              Back to Projects
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
