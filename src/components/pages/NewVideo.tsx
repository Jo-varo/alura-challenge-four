import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import MainTemplate from '../templates/MainTemplate';
import Input from '../atoms/Input';
import data from '../../data/data.json';

const { categories: categoriesData } = data;

const NewVideo = (): JSX.Element => {
  const [categories, setCategories] = useState(categoriesData);

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <MainTemplate>
      <form
        className="w-1/2 mx-auto bg-slate-600 px-4 py-8 rounded my-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="text-4xl text-center mb-10">Nuevo Video</h1>
        <Input type="text" placeholder="Titulo" />
        <Input type="text" placeholder="Link del video" />
        <Input type="text" placeholder="Link imagen de video" />
        <select
          name="category"
          className="bg-black block w-full p-4 mb-4 rounded"
        >
          {categories.map(({ id, code, name }) => (
            <option key={id} value={code}>
              {name}
            </option>
          ))}
        </select>
        <textarea
          className="bg-black block w-full p-4 mb-4 rounded"
          placeholder="Descripción"
        />
        <Input type="text" placeholder="Código de seguridad" />
        <div className="flex justify-between mt-4">
          <div>
            <Button variant="blue" text="Guardar" className="mr-8" submit />
            <Button variant="gray" text="Limpiar" />
          </div>
          <div>
            <Link to="/new-category">
              <Button variant="blue" text="Nueva Categoria" />
            </Link>
          </div>
        </div>
      </form>
    </MainTemplate>
  );
};

export default NewVideo;
