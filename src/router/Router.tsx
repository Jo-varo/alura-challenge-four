import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Page404 from '../components/pages/Page404';
import DefaultPage from '../components/templates/DefaultPage';
import NewCategory from '../components/pages/NewCategory';
import NewVideo from '../components/pages/NewVideo';
import Home from '../components/pages/Home';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultPage />} errorElement={<Page404 />}>
      <Route errorElement={<Page404 />}>
        <Route index element={<Home />} />
        <Route path="new-category" element={<NewCategory />} />
        <Route path="new-video" element={<NewVideo />} />
      </Route>
    </Route>
  )
);

export default Router;
