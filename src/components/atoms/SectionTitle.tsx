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
      className={`px-4 select-none text-white rounded-sm ${
        banner ? 'py-2 md:py-4 text-2xl md:text-6xl inline-block' : 'py-1 md:py-2 text-lg md:text-2xl'
      }`}
      style={{ backgroundColor: color }}
    >
      {text}
    </h2>
  );
};

export default SectionTitle;
