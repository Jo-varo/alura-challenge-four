import { Link } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';

const Page404 = (): JSX.Element => {
  return (
    <MainTemplate>
      <div className="py-24 text-center">
        <h1 className="text-7xl font-bold">Error 404</h1>
        <h2 className="text-3xl mt-6 font-bold">Ha habido un error</h2>
        <p className="text-xl mt-2">
          Intentalo de nuevo más tarde, intenta volver a una página anterior o
          ve a otra
        </p>
        <Link to="/" className="text-xl mt-12 p-4 inline-block hover:underline">Volver a Inicio</Link>
      </div>
    </MainTemplate>
  );
};

export default Page404;
