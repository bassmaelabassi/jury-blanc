import * as yup from 'yup';

const resourceSchema = yup.object().shape({
  name: yup.string().min(3).required('Le nom de la ressource est requis'),
  type: yup.string().min(2).required('Le type de ressource est requis'),
  quantity: yup
    .number()
    .typeError('La quantité doit être un nombre')
    .positive('La quantité doit être supérieure à zéro')
    .required('La quantité est requise'),
  supplier: yup.string().optional(),
});

export default resourceSchema;
