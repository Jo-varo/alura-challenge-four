import * as Yup from 'yup';

const securityCode = Yup.string()
  .max(50, 'Codigo demasiado largo, máximo 50 caracteres')
  .required('Campo requerido');

export const VideoFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Titulo demasiado corto, mínimo 250 caracteres')
    .max(25, 'Titulo demasiado largo, máximo 25 caracteres')
    .required('Campo requerido'),
  url: Yup.string().required('Campo requerido'),
  poster: Yup.string().required('Campo requerido'),
  category: Yup.string().required('Campo requerido'),
  description: Yup.string().max(125, 'Demasiado largo'),
  key: securityCode
});

export const CategoryFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Nombre demasiado corto, mínimo 4 caracteres')
    .max(15, 'Nombre demasiado largo, máximo 15 caracteres')
    .required('Campo requerido'),
  shortDescription: Yup.string()
    .min(8, 'Descripción muy larga, mínimo 8 caracteres')
    .max(30, 'Descripción muy larga, máximo 30 caracteres')
    .required('Campo requerido'),
  longDescription: Yup.string().max(
    250,
    'Descripción muy larga, máximo 250 caracteres'
  ),
  code: Yup.string().max(10, 'Código muy largo, máximo 10 caracteres'),
  color: Yup.string(),
  isFeatured: Yup.boolean(),
  key: securityCode
});
