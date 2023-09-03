import { ErrorMessage, Field } from 'formik';
import { useTheme } from '../../context/themeContext';

interface Props {
  idName: string
  text: string
  type?: string
  as?: string
  newClasses?: string
  error?: boolean
  children?: React.ReactNode
}

const FormInputGroup = ({
  idName,
  text,
  type,
  as,
  newClasses = '',
  error,
  children
}: Props): JSX.Element => {
  const { isLight } = useTheme();

  const classes = (type: string | undefined, error = false): string => {
    const bgColor = isLight ? 'bg-white' : 'bg-neutral-900';
    const generalStyle = `${bgColor} border-gray-400 block w-full rounded border focus:outline-none`;
    const colorField = 'py-2 px-4 h-[58px]';
    const inputField = 'p-4';

    const result = `${generalStyle} ${
      type === 'color' ? colorField : inputField
    }`;

    return error ? `${result} border-red-500` : result;
  };

  const inputProps = {
    id: idName,
    name: idName,
    className: classes(type, error),
    as
  };

  return (
    <div className={newClasses !== '' ? newClasses : 'mb-8'}>
      <label htmlFor={idName}>{text}</label>
      {as === 'select'
        ? (
        <Field {...inputProps}>
          <option value="" disabled hidden>
            {text}
          </option>
          {children}
        </Field>
          )
        : (
        <Field {...inputProps} type={type} placeholder={text} />
          )}
      <ErrorMessage
        component="p"
        name={idName}
        className="text-red-500 absolute"
      />
    </div>
  );
};

export default FormInputGroup;
