import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

interface FormButtonsProps {
  isSubmitting: boolean
  resetForm: () => void
  type: 'category' | 'video'
}

const FormButtons = ({
  isSubmitting,
  resetForm,
  type
}: FormButtonsProps): JSX.Element => {
  return (
    <div className="flex justify-between mt-4">
      <div>
        <Button
          variant="blue"
          text={isSubmitting ? 'Cargando' : 'Guardar'}
          className="mr-8 disabled:bg-blue-950 disabled:text-white disabled:border-blue-950"
          disabled={isSubmitting}
          submit
        />
        <Button
          variant="gray"
          text="Limpiar"
          onClick={() => {
            resetForm();
          }}
        />
      </div>
      <div>
        {type === 'category' && (
          <Link to="/new-video">
            <Button variant="blue" text="Nuevo video" />
          </Link>
        )}
        {type === 'video' && (
          <Link to="/new-category">
            <Button variant="blue" text="Nueva categoria" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default FormButtons;
