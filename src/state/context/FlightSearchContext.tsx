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

interface FlightSearchContextType {
  fromLocation: FlightLocation | null;
  toLocation: FlightLocation | null;
  setFromLocation: (loc: FlightLocation | null) => void;
  setToLocation: (loc: FlightLocation | null) => void;
  getSuggestions: (keyword: string) => Promise<FlightLocation[]>;
  swapLocations: () => void; // Add this
}

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(
  undefined
);

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [fromLocation, setFromLocation] = useState<FlightLocation | null>(null);
  const [toLocation, setToLocation] = useState<FlightLocation | null>(null);

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
        fromLocation,
        toLocation,
        setFromLocation,
        setToLocation,
        getSuggestions,
        swapLocations, // Export it here
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
}

// THIS WAS MISSING:
export const useFlightSearch = () => {
  const context = useContext(FlightSearchContext);
  if (!context) {
    throw new Error(
      'useFlightSearch must be used within a FlightSearchProvider'
    );
  }
  return context;
};
