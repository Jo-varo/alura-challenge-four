import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Router from './router/Router';
import { ThemeProvider } from './context/themeContext';

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <RouterProvider router={Router}/>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
