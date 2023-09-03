import { useTheme } from '../../context/themeContext';
import AuthorFooter from './AuthorFooter';

const Footer = (): JSX.Element => {
  const { isLight } = useTheme();

  return (
    <footer
      className={`${
        isLight ? 'bg-white text-black' : 'bg-black text-white'
      } border-t-2 border-blue-700 md:px-0 text-sm md:text-base`}
    >
      <div className="max-w-[1300px] mx-auto">
        <h3 className="font-bold text-3xl text-blue-700 text-center mt-2">
          ALURAFLIX
        </h3>
      </div>
      <AuthorFooter />
    </footer>
  );
};

export default Footer;
