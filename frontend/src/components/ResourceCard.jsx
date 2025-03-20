// ProjectDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [taskData, setTaskData] = useState({ name: "", description: "" });
  const [resourceData, setResourceData] = useState({ name: "", amount: "" });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    };
    getProjectDetails();
  }, [id]);

  // وظيفة لإضافة مهمة
  const addTask = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/projects/${id}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (response.ok) {
      alert("Tâche ajoutée avec succès !");
      setTaskData({ name: "", description: "" });
    }
  };

  // وظيفة لإضافة مورد
  const addResource = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/projects/${id}/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resourceData),
    });
    if (response.ok) {
      alert("Ressource ajoutée avec succès !");
      setResourceData({ name: "", amount: "" });
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-2xl font-semibold">{project?.name}</h1>
      <p>{project?.description}</p>

      {/* إضافة مهمة */}
      <form onSubmit={addTask} className="mt-4">
        <input
          type="text"
          placeholder="Nom de la tâche"
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          className="mb-2 p-2 rounded"
        />
        <textarea
          placeholder="Description de la tâche"
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
          className="mb-2 p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ajouter la tâche
        </button>
      </form>

      {/* إضافة مورد */}
      <form onSubmit={addResource} className="mt-4">
        <input
          type="text"
          placeholder="Nom de la ressource"
          value={resourceData.name}
          onChange={(e) =>
            setResourceData({ ...resourceData, name: e.target.value })
          }
          className="mb-2 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantité"
          value={resourceData.amount}
          onChange={(e) =>
            setResourceData({ ...resourceData, amount: e.target.value })
          }
          className="mb-2 p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Ajouter la ressource
        </button>
      </form>
    </div>
  );
};

export default ProjectDetails;
