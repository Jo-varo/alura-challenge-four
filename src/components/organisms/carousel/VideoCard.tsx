interface VideoCardProps {
  url: string
  poster: string
  color: string
  description: string
  className?: string
}

const VideoCard = ({
  url,
  poster,
  color,
  description,
  className = ''
}: VideoCardProps): JSX.Element => {
  return (
    <div
      className={`border-4 rounded block aspect-video select-none${
        className !== '' ? ` ${className}` : ''
      }`}
      style={{ borderColor: color }}
    >
      <a href={url} target="_blank" rel="noreferrer">
        <img src={poster} alt={description} className="w-full h-full block" />
      </a>
    </div>
  );
};

export default VideoCard;
