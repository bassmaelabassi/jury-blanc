import React from 'react';

const TaskCard = ({ task, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'InProgress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
          {task.status === 'Pending' ? 'En attente' : 
           task.status === 'InProgress' ? 'En cours' : 'Terminé'}
        </span>
      </div>
      
      <p className="text-gray-600 mt-2">{task.description}</p>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Date de début</p>
          <p className="font-medium">{formatDate(task.startDate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date de fin</p>
          <p className="font-medium">{formatDate(task.endDate)}</p>
        </div>
      </div>
      
      {task.assignee && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Assigné à</p>
          <p className="font-medium">{task.assignee}</p>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 font-medium transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TaskCard;