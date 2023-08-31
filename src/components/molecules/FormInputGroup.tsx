import { ErrorMessage, Field } from 'formik';

interface Props {
  idName: string
  text: string
  type: string
}

const FormInputGroup = ({ idName, text, type }: Props): JSX.Element => {
  return (
    <div className="field-group">
      <label htmlFor={idName}>{text}</label>
      <Field
        type={type}
        id={idName}
        name={idName}
        placeholder={text}
        className="input-field"
      />
      <ErrorMessage component="p" name={idName} className="error" />
    </div>
  );
};

export default FormInputGroup;
