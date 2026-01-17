import './App.scss';
import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Header from '@/components/complex/header/Header.tsx';
import useAppService from '@/useAppService.ts';
import axios from 'axios';
import StorageService from '@/services/StorageService.ts';

function App() {
  const service = useAppService();
  const storageService = StorageService;

  useEffect(() => {
    service.getToken();
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log('token', storageService.getLocalStorage('token'));

        const response = await axios.get(
          'https://test.api.amadeus.com/v1/reference-data/locations',
          {
            headers: { Authorization: storageService.getLocalStorage('token') },
            params: {
              subType: 'CITY,AIRPORT', // Look for both
              keyword: 'LON', // What the user typed
              'page[limit]': 20, // Only get top 5 results
            },
          }
        );
        console.log(response);

        const flightResponse = await axios.get(
          'https://test.api.amadeus.com/v2/shopping/flight-offers',
          {
            headers: {
              Authorization: storageService.getLocalStorage('token'),
            },
            params: {
              originLocationCode: 'NYC',
              destinationLocationCode: 'LON',
              departureDate: '2026-06-01', // Use a future date
              adults: '1',
              max: '5',
            },
          }
        );
        console.log(flightResponse);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        console.log('finally');
      }
    };

    fetchFlights();
  }, []); // Empty array means this runs once on mount

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
