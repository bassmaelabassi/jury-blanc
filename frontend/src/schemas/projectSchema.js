import * as yup from 'yup';

const projectSchema = yup.object().shape({
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
    .required('Le budget est requis'),
});

export default projectSchema;
