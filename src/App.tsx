import './App.scss';
import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Header from '@/components/complex/header/Header.tsx';
import useAppService from '@/useAppService.ts';

function App() {
  const service = useAppService();

  useEffect(() => {
    service.initAuth();
    service.getUserCountryByIP();
  }, []);

  return (
    <div id="AppWrapper">
      <Header />
      <div className="contentPage">
        <Suspense fallback={<div>Loading Page...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
