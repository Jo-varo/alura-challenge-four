import { useRef, useState } from 'react';
import { Formik } from 'formik';
import toast from 'react-hot-toast';

import type { Category, Video, idVidCat } from '../../types';
import { VideoFormSchema } from '../../constants/validations';
import { apiCode } from '../../constants/variables';

import { useTheme } from '../../context/themeContext';
import { useData } from '../../context/dataContext';
import MainTemplate from '../templates/MainTemplate';
import FormButtons from '../molecules/FormButtons';
import Table from '../organisms/table/Table';
import FormTemplate from '../templates/form/FormTemplate';
import FormInputGroup from '../molecules/FormInputGroup';
import { toastHandleDelete } from '../molecules/toastForm/toastDelete';

interface VideoDataForm extends Video {
  key: string
}

const NewVideo = (): JSX.Element => {
  const {
    vids: { videos, createVideo, deleteVideo, updateVideo },
    catgs: { categories }
  } = useData();

  const { isLight } = useTheme();

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
    { title: 'Poster', width: '15%' },
    { title: 'Categoria', width: '10%' },
    { title: 'Descripción', width: '20%' },
    { title: 'Editar', width: '10%' },
    { title: 'Remover', width: '10%' }
  ];

  const handleEdit = (obj: Video | Category): void => {
    const video = obj as Video;
    setIsEditing(true);
    setVideoDataForm({ ...video, key: initialDataVideoForm.key });
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id: idVidCat): void => {
    toastHandleDelete({
      isLight,
      idItem: id,
      type: 'video',
      deleteItem: deleteVideo
    });
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
      <div className="py-5 md:py-10 scroll-smooth" ref={formRef}>
        <FormTemplate title="Nuevo Video">
          <Formik
            initialValues={videoDataForm}
            validationSchema={VideoFormSchema}
            onSubmit={async (values, actions) => {
              const { id, key, ...data } = values;
              if (key !== apiCode) {
                toast.error('Código de seguridad incorrecto', {
                  className: !isLight ? 'bg-neutral-800 text-white' : ''
                });
                actions.setSubmitting(false);
                return;
              }
              isEditing ? await updateVideo(id, data) : await createVideo(data);
              toast.success(isEditing ? 'Video actualizado' : 'Video creado', {
                className: !isLight ? 'bg-neutral-800 text-white' : ''
              });
              actions.setSubmitting(false);
              actions.resetForm();
              resetVideoFormState();
            }}
            enableReinitialize
          >
            {({ handleSubmit, handleReset, isSubmitting, errors, touched }) => (
              <form onSubmit={handleSubmit} className="relative">
                <FormInputGroup
                  idName="title"
                  type="text"
                  text="Titulo"
                  error={errors.title != null && touched.title}
                />
                <FormInputGroup
                  idName="url"
                  type="text"
                  text="Link del video"
                  error={errors.url != null && touched.url}
                />
                <FormInputGroup
                  idName="poster"
                  type="text"
                  text="Link imagen de video"
                  error={errors.poster != null && touched.poster}
                />
                <FormInputGroup
                  idName="category"
                  as="select"
                  text="Seleccione categoría"
                  error={errors.category != null && touched.category}
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
                  error={errors.description != null && touched.description}
                />
                <FormInputGroup
                  idName="key"
                  type="text"
                  text="Código de seguridad"
                  error={errors.key != null && touched.key}
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
        <div className="px-4 md:px-8 overflow-x-auto">
          <h2
            className="inline-block text-2xl cursor-pointer select-none hover:underline mt-10"
            onClick={() => {
              setShowTable(!showTable);
            }}
          >
            {showTable ? 'Esconder' : 'Mostrar'} todos los videos
          </h2>
          {showTable && (
            <Table
              data={videos}
              categories={categories}
              headers={tableHeaders}
              type="video"
              editItem={handleEdit}
              removeItem={handleDelete}
            />
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export default NewVideo;
