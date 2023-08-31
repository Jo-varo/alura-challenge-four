import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';

const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={Router}/>
    </>
  );
};

export default App;
