interface FormTemplateProps {
  children: React.ReactNode
  title: string
}

const FormTemplate = ({ children, title }: FormTemplateProps): JSX.Element => {
  return (
    <div className="w-1/2 mx-auto px-6 py-8 rounded border-2 border-neutral-500">
      <h1 className="text-4xl text-center mb-10">{title}</h1>
      {children}
    </div>
  );
};

export default FormTemplate;
