import * as yup from 'yup';

const taskSchema = yup.object().shape({
  title: yup.string().min(3).required('Le titre est requis'),
  description: yup.string().min(10).required('La description est requise'),
  assignee: yup.string().optional(),
  startDate: yup.date().required('La date de début est requise'),
  endDate: yup.date().required('la date est requis')
    .date()
    .min(yup.ref('startDate'), 'La date de fin doit être après la date de début')
    .required('La date de fin est requise'),
  status: yup.string()
    .oneOf(['Pending', 'InProgress', 'Completed'], 'Statut invalide')
    .required('Le statut est requis'),
});

export default taskSchema;
