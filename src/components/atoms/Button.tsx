interface ButtonProps {
  variant: variantType
  text: string
  className?: string
  submit?: boolean
}

type variantType = 'black' | 'blue' | 'gray';

const Button = ({
  variant,
  text,
  className = '',
  submit = false
}: ButtonProps): JSX.Element => {
  const colors = {
    black: 'bg-black border-white text-white hover:bg-white hover:text-black',
    blue: 'bg-blue-600 border-blue-600 text-white hover:bg-white hover:text-blue-600',
    gray: 'bg-gray-400 border-gray-400 text-black hover:bg-black hover:text-white'
  };

  const classes = (variant: variantType, className: string): string => {
    return className === ''
      ? colors[variant]
      : `${colors[variant]} ${className}`;
  };

  return (
    <button
      className={`border rounded px-4 py-2 ${classes(variant, className)}`}
      type={submit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};

export default Button;
