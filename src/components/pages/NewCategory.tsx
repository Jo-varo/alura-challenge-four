import { useRef, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import { CategoryFormSchema } from '../../constants/validations';
import { apiCode } from '../../constants/variables';

import type { Category, Video } from '../../types';
import { useData } from '../../context/DataContext';
import Table from '../organisms/table/Table';
import MainTemplate from '../templates/MainTemplate';
import FormTemplate from '../templates/form/FormTemplate';
import FormButtons from '../molecules/FormButtons';
import FormInputGroup from '../molecules/FormInputGroup';

interface CategoryDataForm extends Category {
  key: string
}

const NewCategory = (): JSX.Element => {
  const {
    catgs: { categories, deleteCategory, updateCategory, createCategory }
  } = useData();

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
    color: '#000000',
    isFeatured: false,
    key: ''
  };

  const handleEdit = (obj: Category | Video): void => {
    const category = obj as Category;
    setIsEditing(true);
    setCategoryDataForm({ ...category, key: '' });
    formRef.current?.scrollIntoView();
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
                alert('codigo incorrecto');
                actions.setSubmitting(false);
                return;
              }
              isEditing ? updateCategory(id, data) : createCategory(data);
              actions.setSubmitting(false);
              actions.resetForm();
              resetCategoryFormState();
            }}
            enableReinitialize
          >
            {({ handleSubmit, handleReset, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="relative">
                <FormInputGroup
                  idName="name"
                  text="Nombre de la categoria"
                  type="text"
                />
                <FormInputGroup
                  idName="shortDescription"
                  text="Descripción corta"
                  type="text"
                />
                <FormInputGroup
                  idName="longDescription"
                  text="Descripción larga"
                  as="textarea"
                />
                <div className="flex gap-4 field-group">
                  <FormInputGroup
                    idName="code"
                    text="Código de categoria"
                    type="text"
                    newClasses="flex-1"
                  />
                  <FormInputGroup
                    idName="color"
                    text="Color de categoria"
                    type="color"
                    newClasses="flex-1"
                  />
                </div>
                <div className="field-group">
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
            removeItem={deleteCategory}
            editItem={handleEdit}
            headers={tableHeaders}
          />
        )}
      </div>
    </MainTemplate>
  );
};

export default NewCategory;
