import React, { useState } from 'react';
import { addResource } from '../utils/Project.api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3).required('Le nom de la ressource est requis'),
  type: yup.string().min(2).required('Le type de ressource est requis'),
  quantity: yup.number().typeError('La quantité doit être un nombre').positive('La quantité doit être supérieure à zéro').required('La quantité est requise'),
  supplier: yup.string().optional(),
});

const AddResource = ({ projectId, onResourceAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      setLoading(true);
      const newResource = await addResource(projectId, data);
      reset();
      onResourceAdded(newResource);
    } catch (error) {
      setError('Erreur lors de l\'ajout de la ressource.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle ressource</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom de la ressource</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type de ressource</label>
        <input
          id="type"
          type="text"
          {...register('type')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
        <input
          id="quantity"
          type="number"
          {...register('quantity')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
        <input
          id="supplier"
          type="text"
          {...register('supplier')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button 
        type="submit" 
        className="bg-amber-400 text-white p-2 rounded w-full hover:bg-amber-200 transition"
        disabled={loading}
      >
        {loading ? 'Ajout en cours...' : 'Ajouter la ressource'}
      </button>
    </form>
  );
};

export default AddResource;
