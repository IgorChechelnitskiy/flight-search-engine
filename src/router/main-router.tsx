import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.tsx';
import ErrorPage from '@/pages/error-page/ErrorPage.tsx';
import { NavUrlEnum } from '@/const/enums/NavUrlEnum.ts';

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={NavUrlEnum.MAIN} replace />,
      },
      {
        path: NavUrlEnum.MAIN,
        lazy: async () => {
          const { MainPage } = await import('@/pages/main-page/MainPage.tsx');
          return {
            element: <MainPage />,
          };
        },
      },
    ],
  },
]);

export default mainRouter;
