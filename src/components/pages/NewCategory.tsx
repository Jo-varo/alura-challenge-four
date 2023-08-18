import Button from '../atoms/Button';
import MainTemplate from '../templates/MainTemplate';

const NewCategory = (): JSX.Element => {
  return (
    <MainTemplate>
      <h1>Nueva Categoría</h1>
      <form>
        <div>
          <Button variant="gray" text="Guardar" />
          <Button variant="gray" text="Limpiar" />
          <Button variant="gray" text="Nueva Categoria" />
        </div>
      </form>
    </MainTemplate>
  );
};

export default NewCategory;
