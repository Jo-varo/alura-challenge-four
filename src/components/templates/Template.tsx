import { Outlet } from 'react-router-dom';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

const Template = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Template;
