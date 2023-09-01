import * as Yup from 'yup';

export const VideoFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Demasiado corto')
    .max(25, 'Demasiado largo')
    .required('Campo requerido'),
  url: Yup.string().required('Campo requerido'),
  poster: Yup.string().required('Campo requerido'),
  category: Yup.string().required('Campo requerido'),
  description: Yup.string().max(50, 'Demasiado largo'),
  key: Yup.string().max(50, 'Demasiado largo').required('Campo requerido')
});

export const CategoryFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Demasiado corto')
    .max(15, 'Demasiado largo')
    .required('Campo requerido'),
  shortDescription: Yup.string().max(30, 'Demasiado largo'),
  longDescription: Yup.string().max(250, 'Demasiado largo'),
  code: Yup.string().max(10, 'Demasiado largo'),
  color: Yup.string(),
  isFeatured: Yup.boolean(),
  key: Yup.string().max(50, 'Demasiado largo').required('Campo requerido')
});
