interface SectionTitleProps {
  text: string
  color: string
  banner?: boolean
}

const SectionTitle = ({
  text,
  color,
  banner = false
}: SectionTitleProps): JSX.Element => {
  return (
    <h2
      className={`px-4 select-none ${
        banner ? 'py-4 text-6xl inline-block' : 'py-2 text-2xl'
      }`}
      style={{ backgroundColor: color }}
    >
      {text}
    </h2>
  );
};

export default SectionTitle;
