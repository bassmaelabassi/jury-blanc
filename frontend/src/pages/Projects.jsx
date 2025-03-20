import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../utils/Project.api';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };

    getProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-gray-500 mb-2">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-4">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
            <Link to={`/projects/${project._id}`} className="bg-amber-400 text-white px-4 py-2 rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
