import { Link, useLocation } from 'react-router-dom';
import { BiSun, BiMoon } from 'react-icons/bi';
import Button from '../atoms/Button';
import aluraflix from '../../assets/aluraflix.svg';
import { useTheme } from '../../context/themeContext';

const Header = (): JSX.Element => {
  const { pathname } = useLocation();

  const isInVideoFormPage = (path: string): boolean => path === '/new-video';

  const { isLight, switchTheme } = useTheme();

  return (
    <header
      className={`${
        isLight ? 'bg-white' : 'bg-black'
      } border-b-2 border-blue-700`}
    >
      <div className="max-w-[1300px] flex justify-between items-center mx-auto py-4 px-4 md:px-8">
        <Link to="/">
          <img src={aluraflix} alt="aluraflix logo" className='w-32' />
        </Link>
        <div className="flex items-center gap-3 md:gap-10">
          <Link
            className="block"
            to={`${
              isInVideoFormPage(pathname) ? '/new-category' : '/new-video'
            }`}
          >
            <Button
              variant={`${isLight ? 'white' : 'black'}`}
              text={`${
                isInVideoFormPage(pathname) ? 'Nueva Categoria' : 'Nuevo Video'
              }`}
            />
          </Link>
          <button
            className={`rounded-full w-9 h-9 md:w-11 md:h-11 border-2 md:border-[3px] flex items-center justify-center ${
              isLight ? 'border-black' : 'border-white'
            }`}
            onClick={switchTheme}
          >
            {isLight
              ? (
              <BiSun className="text-black w-5 h-5 md:w-7 md:h-7" />
                )
              : (
              <BiMoon className="text-white w-5 h-5 md:w-7 md:h-7" />
                )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
