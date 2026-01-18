import { RouterProvider } from 'react-router-dom';
import mainRouter from './router/main-router.tsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/state/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={mainRouter} />
    </Provider>
  </React.StrictMode>
);
