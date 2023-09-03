import { Outlet } from 'react-router-dom';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import { DataProvider } from '../../context/dataContext';

const DefaultPage = (): JSX.Element => {
  return (
    <DataProvider>
      <Header />
      <Outlet />
      <Footer />
    </DataProvider>
  );
};

export default DefaultPage;
