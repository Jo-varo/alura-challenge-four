import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
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
    <div className="flex justify-between flex-col md:flex-row mt-4">
      <div className="flex justify-center items-center gap-8 mb-10 md:mb-0">
        <Button
          variant="blue"
          text={isSubmitting ? <ImSpinner2 className="animate-spin w-6 h-6" /> : 'Guardar'}
          className="disabled:bg-blue-950 disabled:text-white disabled:border-blue-950 flex-1"
          disabled={isSubmitting}
          submit
        />
        <Button
          variant="gray"
          className="flex-1"
          text="Limpiar"
          onClick={() => {
            resetForm();
          }}
        />
      </div>
      {type === 'category' && (
        <Link to="/new-video" className="flex-1 md:flex-none">
          <Button variant="blue" text="Nuevo video" className="w-full" />
        </Link>
      )}
      {type === 'video' && (
        <Link to="/new-category" className="flex-1 md:flex-none">
          <Button variant="blue" text="Nueva categoría" className="w-full" />
        </Link>
      )}
    </div>
  );
};

export default FormButtons;
