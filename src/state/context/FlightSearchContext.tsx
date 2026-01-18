import { createContext, type ReactNode, useContext, useState } from 'react';
import { appApiService } from '@/services/api/AppApiService.ts';

export interface FlightLocation {
  type: string;
  subType: 'CITY' | 'AIRPORT';
  name: string;
  iataCode: string;
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
  };
  id: string;
}

export interface IPassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface FlightSearchContextType {
  fromLocation: FlightLocation | null;
  toLocation: FlightLocation | null;
  setFromLocation: (loc: FlightLocation | null) => void;
  setToLocation: (loc: FlightLocation | null) => void;
  getSuggestions: (keyword: string) => Promise<FlightLocation[]>;
  swapLocations: () => void;
  tripType: 'one-way' | 'round-trip';
  cabinClass: string;
  setTripType: (type: 'one-way' | 'round-trip') => void;
  setCabinClass: (cabin: string) => void;
  passengerCounts: IPassengerCounts;
  setPassengerCounts: (counts: IPassengerCounts) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  searchParams: {
    originLocationCode: string;
    destinationLocationCode: string;
    travelClass: string;
    adults: number;
    children?: number;
    infants?: number;
  } | null;
}

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(
  undefined
);

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<string>('USD');
  const [fromLocation, setFromLocation] = useState<FlightLocation | null>(null);
  const [toLocation, setToLocation] = useState<FlightLocation | null>(null);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [cabinClass, setCabinClass] = useState('ECONOMY');
  const [passengerCounts, setPassengerCounts] = useState<IPassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const searchParams =
    fromLocation && toLocation
      ? {
          originLocationCode: fromLocation.iataCode,
          destinationLocationCode: toLocation.iataCode,
          travelClass: cabinClass,
          adults: passengerCounts.adults,
          ...(passengerCounts.children > 0 && {
            children: passengerCounts.children,
          }),
          ...(passengerCounts.infants > 0 && {
            infants: passengerCounts.infants,
          }),
        }
      : null;

  const getSuggestions = async (keyword: string): Promise<FlightLocation[]> => {
    try {
      const data = await appApiService.getLocations(keyword);
      return data || [];
    } catch (error) {
      console.error('Autocomplete failed', error);
      return [];
    }
  };

  const swapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <FlightSearchContext.Provider
      value={{
        currency,
        setCurrency,
        fromLocation,
        toLocation,
        setFromLocation,
        setToLocation,
        tripType,
        setTripType,
        cabinClass,
        setCabinClass,
        getSuggestions,
        swapLocations,
        searchParams,
        passengerCounts,
        setPassengerCounts,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
}

export const useFlightSearch = () => {
  const context = useContext(FlightSearchContext);
  if (!context) {
    throw new Error(
      'useFlightSearch must be used within a FlightSearchProvider'
    );
  }
  return context;
};
