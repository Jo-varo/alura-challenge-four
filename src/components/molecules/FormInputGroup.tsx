import { ErrorMessage, Field } from 'formik';

interface Props {
  idName: string
  text: string
  type?: string
  as?: string
  newClasses?: string
  children?: React.ReactNode
}

const FormInputGroup = ({
  idName,
  text,
  type,
  as,
  newClasses = '',
  children
}: Props): JSX.Element => {
  const inputProps = {
    id: idName,
    name: idName,
    className: type === 'color' ? 'color-field' : 'input-field',
    as
  };

  return (
    <div className={newClasses !== '' ? newClasses : 'field-group'}>
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
        <Field
          {...inputProps}
          type={type}
          placeholder={text}
        />
          )}
      <ErrorMessage component="p" name={idName} className="error" />
    </div>
  );
};

export default FormInputGroup;
