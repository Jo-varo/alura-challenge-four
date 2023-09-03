import { Link } from 'react-router-dom';
import { BsEmojiDizzy, BsArrowLeft } from 'react-icons/bs';
import MainTemplate from '../templates/MainTemplate';

const Page404 = (): JSX.Element => {
  return (
    <MainTemplate>
      <div className="py-24 text-center">
        <BsEmojiDizzy className="text-6xl mx-auto text-blue-600"/>
        <h1 className="text-7xl font-bold text-blue-600">Error 404</h1>
        <h2 className="text-3xl mt-8 font-bold">Ha habido un error</h2>
        <p className="text-xl mt-2">
          Intentalo de nuevo más tarde, intenta volver a una página anterior o
          ve a otra
        </p>
        <Link to="/" className="text-xl mt-12 p-4 inline-block hover:underline">
          <BsArrowLeft className="text-1xl mx-auto inline-block mr-2" />
          Volver a Inicio
        </Link>
      </div>
    </MainTemplate>
  );
};

export default Page404;
