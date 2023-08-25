import { Outlet } from 'react-router-dom';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

const DefaultPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultPage;
