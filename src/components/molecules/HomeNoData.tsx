import { ImFileEmpty } from 'react-icons/im';

interface Props {
  type: 'category' | 'video'
}

const HomeNoData = ({ type }: Props): JSX.Element => {
  return (
    <div className="px-8 py-20">
      <ImFileEmpty className="mx-auto text-4xl mb-4" />
      <h1 className="text-center text-3xl">
        No hay {type === 'category' ? 'ninguna categoria' : 'ningun video'}
      </h1>
    </div>
  );
};

export default HomeNoData;
