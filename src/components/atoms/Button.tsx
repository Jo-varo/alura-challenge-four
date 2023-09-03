interface ButtonProps {
  variant: variantType
  text: string | JSX.Element
  className?: string
  submit?: boolean
  onClick?: (evt: React.MouseEvent) => void
  disabled?: boolean
}

type variantType = 'black' | 'blue' | 'gray' | 'white';

const Button = ({
  variant,
  text,
  className = '',
  submit = false,
  disabled,
  onClick
}: ButtonProps): JSX.Element => {
  const colors = {
    black: 'bg-black border-white text-white hover:bg-white hover:text-black',
    blue: 'bg-blue-600 border-blue-600 text-white hover:bg-white hover:text-blue-600',
    gray: 'bg-gray-300 border-gray-400 text-black hover:bg-black hover:text-white',
    white: 'bg-white border-black text-black hover:bg-black hover:text-white'
  };

  const classes = (variant: variantType, className: string): string => {
    return className === ''
      ? colors[variant]
      : `${colors[variant]} ${className}`;
  };

  return (
    <button
      className={`border rounded px-2 py-1 md:px-4 md:py-2 select-none ${classes(variant, className)}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
