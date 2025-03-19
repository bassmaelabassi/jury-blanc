import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject } from '../utils/Project.api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };

    getProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const createdProject = await createProject(newProject);
    setProjects([...projects, createdProject]);
    setShowForm(false);
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: '',
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-gray-700 rounded-lg p-6 shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-black-800 mb-6 text-center">Tableau pour ajout les projets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="py-2 px-6 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-200 transition mb-4 block mx-auto"
        >
          {showForm ? 'Fermer le formulaire' : 'Ajouter un nouveau projet'}
        </button>
        {showForm && (
          <form
            onSubmit={handleAddProject}
            className="flex flex-col justify-center items-center bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-lg mt-6"
          >
            <div className="w-full mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du projet :</label>
              <input
                id="name"
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du projet :</label>
              <textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début :</label>
              <input
                id="startDate"
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin :</label>
              <input
                id="endDate"
                type="date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="w-full mb-6">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget :</label>
              <input
                id="budget"
                type="number"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-6 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-200 transition"
            >
              Ajouter le projet
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-6 w-full">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg p-6 w-80 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-600">Date de début: {project.startDate}</p>
            <p className="text-gray-600">Date de fin: {project.endDate}</p>
            <p className="text-gray-600">Budget: {project.budget} €</p>
            <Link to={`/projects/${project.id}`} className="text-green-500 font-semibold mt-4 block hover:text-green-600">
              Voir les détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
