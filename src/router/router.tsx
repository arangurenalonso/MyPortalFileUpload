import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import authRoutes from '../module/auth/routes/authRouters';
import AuthContainer from '../module/auth/AuthContainer';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import MainContainer from '../module/main/MainContainer';
import mainRouters from '../module/main/routes/mainRouters';
import Root from './Root';

const routesConfig: RouteObject[] = [
  {
    path: '',
    element: (
      <PrivateRouter>
        <MainContainer />
      </PrivateRouter>
    ),
    children: mainRouters,
  },
  {
    path: 'auth',
    element: (
      <PublicRouter>
        <AuthContainer />
      </PublicRouter>
    ),
    children: authRoutes,
  },
  {
    path: '*',
    element: <Navigate to="" replace />,
  },
];

const routerWrapper: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: routesConfig,
  },
  // {
  //   path: '*',
  //   element: <Navigate to="/" replace />,
  // },
];
const router = createBrowserRouter(routerWrapper);
export default router;
