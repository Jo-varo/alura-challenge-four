import { useRef, useState } from 'react';
import { Formik } from 'formik';

import type { Category, Video } from '../../types';
import { VideoFormSchema } from '../../constants/validations';
import MainTemplate from '../templates/MainTemplate';
import { useData } from '../../context/DataContext';
import { apiCode } from '../../constants/variables';
import FormButtons from '../molecules/FormButtons';
import Table from '../organisms/table/Table';
import FormTemplate from '../templates/form/FormTemplate';
import FormInputGroup from '../molecules/FormInputGroup';

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
  const [showTable, setShowTable] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  return (
    <MainTemplate>
      <div className="py-10" ref={formRef}>
        <FormTemplate title="Nuevo Video">
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
                <FormInputGroup idName="title" type="text" text="Titulo" />
                <FormInputGroup
                  idName="url"
                  type="text"
                  text="Link del video"
                />
                <FormInputGroup
                  idName="poster"
                  type="text"
                  text="Link imagen de video"
                />
                <FormInputGroup
                  idName="category"
                  as="select"
                  text="Seleccione categoria"
                >
                  {categories.map(({ id, code, name }) => (
                    <option key={id} value={code}>
                      {name}
                    </option>
                  ))}
                </FormInputGroup>
                <FormInputGroup
                  idName="description"
                  type="text"
                  text="Descripción"
                  as="textarea"
                />
                <FormInputGroup
                  idName="key"
                  type="text"
                  text="Código de seguridad"
                />
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
        </FormTemplate>
        <h2
          className="inline-block text-2xl cursor-pointer select-none hover:underline mt-10"
          onClick={() => {
            setShowTable(!showTable);
          }}
        >
          Mostrar todos los videos
        </h2>
        {showTable && (
          <Table
            data={videos}
            categories={categories}
            headers={tableHeaders}
            editItem={handleEdit}
            removeItem={deleteVideo}
          />
        )}
      </div>
    </MainTemplate>
  );
};

export default NewVideo;
