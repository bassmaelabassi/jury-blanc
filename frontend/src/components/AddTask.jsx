import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const AddTask = ({ projectId, onTaskAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      setLoading(true);
      const newTask = await addTask(projectId, data);
      reset();
      onTaskAdded(newTask);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors de l'ajout de la tâche.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle tâche</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input {...register("title")} type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea {...register("description")} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
        <input {...register("startDate")} type="date" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
        <input {...register("endDate")} type="date" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <select {...register("status")} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="Pending">En attente</option>
          <option value="InProgress">En cours</option>
          <option value="Completed">Terminé</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>
      <button type="submit" className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition" disabled={loading}>
        {loading ? 'Ajout en cours...' : 'Ajouter la tâche'}
      </button>
    </form>
  );
};

export default AddTask;
