interface InputProps {
  type: string
  placeholder: string
}

const Input = ({ type, placeholder }: InputProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-black block w-full p-4 mb-4 rounded"
    />
  );
};

export default Input;
