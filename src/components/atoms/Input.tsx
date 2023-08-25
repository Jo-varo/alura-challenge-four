interface InputProps {
  type: string
  onChange?: (evt: React.ChangeEvent) => void
  value?: string
  placeholder: string
  required?: boolean
}

const Input = ({
  value,
  onChange,
  type,
  placeholder,
  required
}: InputProps): JSX.Element => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      className="bg-black block w-full p-4 mb-4 rounded"
    />
  );
};

export default Input;
