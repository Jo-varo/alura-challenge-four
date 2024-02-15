import { BsDatabaseExclamation } from 'react-icons/bs';
import { ImFileEmpty } from 'react-icons/im';
import { LiaVideoSlashSolid } from 'react-icons/lia';

interface Props {
  type: 'category' | 'video' | 'data'
}

const HomeNoData = ({ type }: Props): JSX.Element => {
  const messages = {
    category: 'ninguna categoría',
    video: 'ningún video',
    data: 'datos'
  };

  const ErrorIcon = ({
    type,
    className
  }: {
    type: Props['type']
    className: string
  }): JSX.Element => {
    const iconByError: Record<Props['type'], React.ElementType> = {
      data: BsDatabaseExclamation,
      video: LiaVideoSlashSolid,
      category: ImFileEmpty
    };

    const Icon = iconByError[type];

    return <Icon className={className} />;
  };

  return (
    <div className="px-8 py-20">
      <ErrorIcon type={type} className="mx-auto text-6xl mb-4 animate-bounce" />
      <h1 className="text-center text-3xl">No hay {messages[type]}</h1>
    </div>
  );
};

export default HomeNoData;
