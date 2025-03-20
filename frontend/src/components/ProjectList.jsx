import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6 w-full">
      {projects.length === 0 ? (
        <p className="text-gray-500 text-center w-full">Aucun projet disponible.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="bg-gray-700 rounded-lg p-6 w-80 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{project.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>Date de début: <span className="text-gray-700 font-medium">{formatDate(project.startDate)}</span></p>
              <p>Date de fin: <span className="text-gray-700 font-medium">{formatDate(project.endDate)}</span></p>
              <p>Budget: <span className="text-gray-700 font-medium">{project.budget.toLocaleString()} €</span></p>
            </div>
            
            <Link 
              to={`/projects/${project.id}`} 
              className="mt-4 inline-block text-amber-400 font-semibold hover:text-amber-200 transition"
            >
              Voir les détails
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;