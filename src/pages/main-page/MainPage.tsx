import cs from './MainPage.module.scss';
import useAppService from '@/useAppService.ts';
import { useEffect } from 'react';
import { FiltersGroup } from '@/components/complex/filters-group/FiltersGroup.tsx';
import { FlightSearchProvider } from '@/state/context/FlightSearchContext.tsx';

export function MainPage() {
  const { state, ...service } = useAppService();
  const searchParams = {
    originLocationCode: 'JFK',
    destinationLocationCode: 'LON',
    departureDate: '2026-05-15',
    returnDate: '2026-05-25', // Optional: Remove for one-way
    adults: 1,
    travelClass: 'ECONOMY',
    nonStop: true,
    currencyCode: 'USD',
    max: 10, // Only get the top 10 best deals
  };

  // Calling your service

  useEffect(() => {
    service.getLocations('buc');
    service.getFlights(searchParams);
  }, []);

  console.log('trendingFlights', state.trendingFlights);

  return (
    <div className={cs.mainPage}>
      <div className={cs.heroSection}>
        <div className="text-center space-y-2 py-8 px-12 rounded-2xl backdrop-blur-sm bg-black/10">
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-2">
            <span className="text-6xl md:text-8xl font-extralight tracking-tight text-white uppercase">
              Flights
            </span>
            <span className="text-6xl md:text-8xl font-black tracking-tighter text-blue-400 uppercase italic">
              Booking
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium tracking-wide">
            Explore the world with ease
          </p>
        </div>
      </div>
      <FlightSearchProvider>
        <FiltersGroup />
      </FlightSearchProvider>
    </div>
  );
}
