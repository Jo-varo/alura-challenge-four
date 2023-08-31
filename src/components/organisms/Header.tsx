import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Button from '../atoms/Button';
import aluraflix from '../../assets/aluraflix.svg';

const Header = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname)
  }, [location]);

  const [path, setPath] = useState('');

  return (
    <header className="bg-black border-b-2 border-blue-700">
      <div className="max-w-[1300px] flex justify-between items-center mx-auto py-4 px-8">
        <Link to="/">
          <img src={aluraflix} alt="aluraflix logo" />
        </Link>
        {path === '/new-video'
          ? (
          <Link to="/new-category">
            <Button variant="black" text="Nueva Categoria" />
          </Link>
            )
          : (
          <Link to="/new-video">
            <Button variant="black" text="Nuevo Video" />
          </Link>
            )}
      </div>
    </header>
  );
};

export default Header;
