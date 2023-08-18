interface SectionVideoProps {
  url: string
  poster: string
  color: string
  description: string
  className?: string
}

const SectionVideoItem = ({
  url,
  poster,
  color,
  description,
  className = ''
}: SectionVideoProps): JSX.Element => {
  return (
    <li
      className={`border-4 rounded block aspect-video${
        className !== '' ? ` ${className}` : ''
      }`}
      style={{ borderColor: color }}
    >
      <a
        href={url}
      >
        <img src={poster} alt={description} className="w-full h-full block" />
      </a>
    </li>
  );
};

export default SectionVideoItem;
