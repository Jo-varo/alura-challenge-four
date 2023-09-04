import { useTheme } from '../../context/themeContext';
import AuthorFooter from './AuthorFooter';
import aluraflix from '../../assets/aluraflix.svg';

const Footer = (): JSX.Element => {
  const { isLight } = useTheme();

  return (
    <footer
      className={`${
        isLight ? 'bg-white text-black' : 'bg-black text-white'
      } border-t-2 border-blue-700 md:px-0 text-sm md:text-base`}
    >
      <div className="max-w-[1300px] mx-auto">
        <img
          src={aluraflix}
          alt="aluraflix logo"
          className="w-40 mx-auto my-2"
        />
      </div>
      <AuthorFooter />
    </footer>
  );
};

export default Footer;
