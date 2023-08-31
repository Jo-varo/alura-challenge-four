import { useRef, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';

import type { Category, Video } from '../../types';
import { VideoFormSchema } from '../../constants/validations';
import MainTemplate from '../templates/MainTemplate';
import { useData } from '../../context/DataContext';
import { apiCode } from '../../constants/variables';
import FormButtons from '../molecules/FormButtons';
import Table from '../organisms/table/Table';

interface VideoDataForm extends Video {
  key: string
}

const NewVideo = (): JSX.Element => {
  const {
    vids: { videos, createVideo, deleteVideo, updateVideo },
    catgs: { categories }
  } = useData();

  const initialDataVideoForm = {
    id: '',
    title: '',
    url: '',
    poster: '',
    category: '',
    description: '',
    key: ''
  };

  const tableHeaders = [
    { title: 'Nombre', width: '20%' },
    { title: 'Video', width: '15%' },
    { title: 'Poster', width: '15' },
    { title: 'Categoria', width: '10%' },
    { title: 'Descripción', width: '20%' },
    { title: 'Editar', width: '10%' },
    { title: 'Remover', width: '10%' }
  ];

  const handleEdit = (obj: Video | Category): void => {
    const video = obj as Video;
    setIsEditing(true);
    setVideoDataForm({ ...video, key: '' });
    formRef.current?.scrollIntoView();
  };

  const resetVideoFormState = (): void => {
    setIsEditing(false);
    setVideoDataForm(initialDataVideoForm);
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [videoDataForm, setVideoDataForm] =
    useState<VideoDataForm>(initialDataVideoForm);

  const formRef = useRef<HTMLDivElement>(null);

  return (
    <MainTemplate>
      <div className="py-10" ref={formRef}>
        <div className="w-1/2 mx-auto px-6 py-8 rounded border-2 border-neutral-500">
          <h1 className="text-4xl text-center mb-10">Nuevo Video</h1>
          <Formik
            initialValues={videoDataForm}
            validationSchema={VideoFormSchema}
            onSubmit={(values, actions) => {
              const { id, key, ...data } = values;
              if (key !== apiCode) {
                alert('codigo incorrecto');
                actions.setSubmitting(false);
                return;
              }
              isEditing ? updateVideo(id, data) : createVideo(data);
              actions.setSubmitting(false);
              actions.resetForm();
              resetVideoFormState();
            }}
            enableReinitialize
          >
            {({ handleSubmit, handleReset, isSubmitting, errors, touched }) => (
              <form onSubmit={handleSubmit} className="relative">
                <div className="field-group">
                  <label htmlFor="title">Titulo</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Titulo"
                    required
                    className="input-field"
                  />
                  <ErrorMessage component="p" name="title" className="error" />
                </div>
                <div className="field-group">
                  <label htmlFor="url">Link del video</label>
                  <Field
                    type="text"
                    name="url"
                    placeholder="Link del video"
                    required
                    className="input-field"
                  />
                  <ErrorMessage component="p" name="url" className="error" />
                </div>
                <div className="field-group">
                  <label htmlFor="poster">Link imagen de video</label>
                  <Field
                    name="poster"
                    type="text"
                    placeholder="Link imagen de video"
                    required
                    className="input-field"
                  />
                  <ErrorMessage component="p" name="poster" className="error" />
                </div>
                <div className="field-group">
                  <label htmlFor="category">Categoria</label>
                  <Field
                    as="select"
                    name="category"
                    required
                    className="input-field"
                  >
                    <option value="" disabled hidden>
                      Seleccione categoria
                    </option>
                    {categories.map(({ id, code, name }) => (
                      <option key={id} value={code}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="p"
                    name="category"
                    className="error"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="category">Descripción</label>
                  <Field
                    component="textarea"
                    name="description"
                    className="input-field"
                    placeholder="Descripción"
                  />
                  <ErrorMessage
                    component="p"
                    name="description"
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
                  type="video"
                  isSubmitting={isSubmitting}
                  resetForm={() => {
                    resetVideoFormState();
                    handleReset();
                  }}
                />
              </form>
            )}
          </Formik>
        </div>
        <Table
          data={videos}
          categories={categories}
          headers={tableHeaders}
          editItem={handleEdit}
          removeItem={deleteVideo}
        />
      </div>
    </MainTemplate>
  );
};

export default NewVideo;
