import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import aluraflix from '../../assets/aluraflix.svg'

const Header = (): JSX.Element => {
  return (
    <header className="bg-black border-b-2 border-blue-700">
      <div className="max-w-[1300px] flex justify-between items-center mx-auto py-4 px-8">
        <Link to="/">
          <img src={aluraflix} alt="aluraflix logo" />
        </Link>
        <Link to="/new-video">
          <Button variant="black" text="Nuevo Video" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
