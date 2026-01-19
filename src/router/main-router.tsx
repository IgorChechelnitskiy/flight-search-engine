import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.tsx';
import ErrorPage from '@/pages/error-page/ErrorPage.tsx';
import { NavUrlEnum } from '@/const/enums/NavUrlEnum.ts';
import {
  FlightResultsSkeleton
} from '@/components/complex/flight-results/FlightResults.tsx';

const mainRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Navigate to={NavUrlEnum.MAIN} relative="route" />,
        },
        {
          path: NavUrlEnum.MAIN,
          HydrateFallback: FlightResultsSkeleton,
          lazy: async () => {
            const { MainPage } = await import('@/pages/main-page/MainPage.tsx');
            return {
              element: <MainPage />,
            };
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

export default mainRouter;
