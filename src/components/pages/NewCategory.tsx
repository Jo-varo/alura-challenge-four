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
                <div className="field-group">
                  <label htmlFor="name">Nombre de la categoria</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nombre de la categoria"
                    required
                    className="input-field"
                  />
                  <ErrorMessage component="p" name="name" className="error" />
                </div>
                <div className="field-group">
                  <label htmlFor="shortDescription">Descripción corta</label>
                  <Field
                    type="text"
                    name="shortDescription"
                    placeholder="Descripción corta"
                    required
                    className="input-field"
                  />
                  <ErrorMessage
                    component="p"
                    name="shortDescription"
                    className="error"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="longDescription">Descripción larga</label>
                  <Field
                    component="textarea"
                    type="text"
                    name="longDescription"
                    placeholder="Descripción larga"
                    className="input-field"
                  />
                  <ErrorMessage
                    component="p"
                    name="longDescription"
                    className="error"
                  />
                </div>
                <div className="flex gap-4 field-group">
                  <div className="flex-1">
                    <label htmlFor="code">Código de categoria</label>
                    <Field
                      type="text"
                      name="code"
                      placeholder="Código de categoria"
                      className="input-field"
                    />
                    <ErrorMessage component="p" name="code" className="error" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="color">Color</label>
                    <Field
                      type="color"
                      name="color"
                      placeholder="Color"
                      className="bg-neutral-900 block w-full p-2 rounded border border-gray-400 h-[70%] box-border"
                    />
                    <ErrorMessage
                      component="p"
                      name="color"
                      className="error"
                    />
                  </div>
                </div>
                <div className="field-group">
                  <div className="flex items-center">
                    <label htmlFor="isFeatured">
                      ¿Resaltar categoria en la página principal?
                    </label>
                    <Field
                      type="checkbox"
                      name="isFeatured"
                      id="isFeatured"
                      placeholder="Color"
                      className="border h-5 w-5 ml-4"
                    />
                  </div>
                  <ErrorMessage
                    component="p"
                    name="isFeatured"
                    className="error"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="key">Código de seguridad</label>
                  <Field
                    name="key"
                    type="text"
                    placeholder="Código de seguridad"
                    className="input-field"
                  />
                  <ErrorMessage component="p" name="key" className="error" />
                </div>
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
        <Table
          data={categories}
          removeItem={deleteCategory}
          editItem={handleEdit}
          headers={tableHeaders}
        />
      </div>
    </MainTemplate>
  );
};

export default NewCategory;
