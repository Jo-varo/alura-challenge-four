import { useRef, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import toast from 'react-hot-toast';

import type { Category, Video, idVidCat } from '../../types';
import { CategoryFormSchema } from '../../constants/validations';
import { apiCode } from '../../constants/variables';

import { useTheme } from '../../context/themeContext';
import { useData } from '../../context/dataContext';
import MainTemplate from '../templates/MainTemplate';
import FormTemplate from '../templates/form/FormTemplate';
import Table from '../organisms/table/Table';
import FormButtons from '../molecules/FormButtons';
import FormInputGroup from '../molecules/FormInputGroup';

interface CategoryDataForm extends Category {
  key: string
}

const NewCategory = (): JSX.Element => {
  const {
    catgs: { categories, deleteCategory, updateCategory, createCategory }
  } = useData();

  const { isLight } = useTheme();

  const tableHeaders = [
    { title: 'Categoria', width: '15%' },
    { title: 'Descripción corta', width: '15%' },
    { title: 'Descripción larga', width: '20%' },
    { title: 'Código', width: '10%' },
    { title: 'Color', width: '10%' },
    { title: 'Resaltado', width: '10%' },
    { title: 'Editar', width: '10%' },
    { title: 'Remover', width: '10%' }
  ];

  const initialDataCategoryForm = {
    id: '',
    name: '',
    shortDescription: '',
    longDescription: '',
    code: '',
    color: '#A2C29E',
    isFeatured: false,
    key: ''
  };

  const handleEdit = (obj: Category | Video): void => {
    const category = obj as Category;
    setIsEditing(true);
    setCategoryDataForm({ ...category, key: '' });
    formRef.current?.scrollIntoView();
  };

  const handleDelete = (_id: idVidCat): void => {
    toast(
      (t) => (
        <div>
          <p className={`${isLight ? 'text-black' : 'text-white'} mb-3`}>
            ¿Estas seguro de eliminar la categoria?
          </p>
          <div className="flex items-center justify-evenly px-4">
            <button
              className="bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                deleteCategory(_id);
                toast.dismiss(t.id);
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-600 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: isLight ? '#ededed' : '#202020'
        }
      }
    );
  };

  const resetCategoryFormState = (): void => {
    setIsEditing(false);
    setCategoryDataForm(initialDataCategoryForm);
  };

  const [categoryDataForm, setCategoryDataForm] = useState<CategoryDataForm>(
    initialDataCategoryForm
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showTable, setShowTable] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  return (
    <MainTemplate>
      <div className="py-10" ref={formRef}>
        <FormTemplate title="Nueva Categoría">
          <Formik
            initialValues={categoryDataForm}
            validationSchema={CategoryFormSchema}
            onSubmit={(values, actions) => {
              const { id, key, ...data } = values;
              if (key !== apiCode) {
                toast.error('Código de seguridad incorrecto', {
                  className: !isLight ? 'bg-neutral-800 text-white' : ''
                });
                actions.setSubmitting(false);
                return;
              }
              isEditing ? updateCategory(id, data) : createCategory(data);
              toast.success(
                isEditing ? 'Categoria actualizada' : 'Categoria creada',
                {
                  className: !isLight ? 'bg-neutral-800 text-white' : ''
                }
              );
              actions.setSubmitting(false);
              actions.resetForm();
              resetCategoryFormState();
            }}
            enableReinitialize
          >
            {({ handleSubmit, handleReset, isSubmitting, touched, errors }) => (
              <form onSubmit={handleSubmit} className="relative">
                <FormInputGroup
                  idName="name"
                  text="Nombre de la categoria"
                  type="text"
                  error={errors.name != null && touched.name}
                />
                <FormInputGroup
                  idName="shortDescription"
                  text="Descripción corta"
                  type="text"
                  error={
                    errors.shortDescription != null && touched.shortDescription
                  }
                />
                <FormInputGroup
                  idName="longDescription"
                  text="Descripción larga"
                  as="textarea"
                  error={
                    errors.longDescription != null && touched.longDescription
                  }
                />
                <div className="flex gap-4 mb-8">
                  <FormInputGroup
                    idName="code"
                    text="Código de categoria"
                    type="text"
                    newClasses="flex-1"
                    error={errors.code != null && touched.code}
                  />
                  <FormInputGroup
                    idName="color"
                    text="Color de categoria"
                    type="color"
                    newClasses="flex-1"
                    error={errors.color != null && touched.color}
                  />
                </div>
                <div className="mb-8">
                  <div className="flex items-center">
                    <label htmlFor="isFeatured" className="select-none">
                      ¿Resaltar categoria en la página principal?
                    </label>
                    <Field
                      type="checkbox"
                      name="isFeatured"
                      id="isFeatured"
                      className="border h-5 w-5 ml-4"
                    />
                  </div>
                  <ErrorMessage
                    component="p"
                    name="isFeatured"
                    className="error"
                  />
                </div>
                <FormInputGroup
                  idName="key"
                  text="Código de seguridad"
                  type="text"
                  error={errors.key != null && touched.key}
                />
                <FormButtons
                  type="category"
                  isSubmitting={isSubmitting}
                  resetForm={() => {
                    resetCategoryFormState();
                    handleReset();
                  }}
                />
              </form>
            )}
          </Formik>
        </FormTemplate>
        <div className="px-8">
          <h2
            className="inline-block text-2xl cursor-pointer select-none hover:underline mt-10"
            onClick={() => {
              setShowTable(!showTable);
            }}
          >
            Mostrar todas las categorias
          </h2>
          {showTable && (
            <Table
              data={categories}
              removeItem={handleDelete}
              editItem={handleEdit}
              headers={tableHeaders}
            />
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export default NewCategory;
