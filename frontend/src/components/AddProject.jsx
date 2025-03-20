import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createProject } from '../utils/Project.api';

const schema = yup.object().shape({
  name: yup.string().required('Le nom du projet est requis'),
  description: yup.string().required('La description est requise'),
  startDate: yup.date().required('La date de début est requise'),
  endDate: yup
    .date()
    .required('La date de fin est requise')
    .min(yup.ref('startDate'), 'La date de fin doit être après la date de début'),
  budget: yup
    .number()
    .typeError('Le budget doit être un nombre')
    .positive('Le budget doit être supérieur à zéro')
    .required('Le budget est requis')
});

const AddProject = ({ onProjectAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const newProject = await createProject(data);
      onProjectAdded(newProject);
      reset();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau projet</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-black mb-1">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
        <input
          id="startDate"
          type="date"
          {...register('startDate')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
        <input
          id="endDate"
          type="date"
          {...register('endDate')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (€)</label>
        <input
          id="budget"
          type="number"
          {...register('budget')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.budget?.message}</p>
      </div>

      <button
        type="submit"
        className="bg-amber-400 text-white p-2 rounded w-full hover:bg-amber-400 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Ajout en cours...' : 'Ajouter le projet'}
      </button>
    </form>
  );
};

export default AddProject;