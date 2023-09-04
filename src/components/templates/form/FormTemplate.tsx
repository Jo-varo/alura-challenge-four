import { useTheme } from '../../../context/themeContext';

interface FormTemplateProps {
  children: React.ReactNode
  title: string
}

const FormTemplate = ({ children, title }: FormTemplateProps): JSX.Element => {
  const { isLight } = useTheme();
  return (
    <div
      className={`md:w-1/2 mx-4 md:mx-auto px-4 md:px-6 py-6 md:py-8 rounded border-2 shadow-lg ${
        isLight ? 'border-neutral-200 shadow-neutral-300' : 'border-neutral-600 shadow-neutral-600'
      }`}
    >
      <h1 className="text-3xl md:text-4xl text-center mb-6 md:mb-10">{title}</h1>
      {children}
    </div>
  );
};

export default FormTemplate;
