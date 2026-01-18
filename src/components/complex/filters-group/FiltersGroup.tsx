import cs from './FiltersGroup.module.scss';
import { useState } from 'react';
import {
  UniversalSelector
} from '@/components/complex/universal-selector/UniversalSelector.tsx';
import {
  PassengerSelector
} from '@/components/complex/passenger-selector/PassengerSelector.tsx';
import {
  FlightAutocomplete
} from '@/components/complex/flight-autocomplite/FlightAutocomplite.tsx';
import {
  FlightDatePicker
} from '@/components/complex/flight-datepicker/FlightDatepicker.tsx';
import { ArrowLeftRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useFlightSearch } from '@/state/context/FlightSearchContext.tsx';
import { appApiService } from '@/services/api/AppApiService.ts';
import { format } from 'date-fns'; // Recommended for date formatting

export function FiltersGroup() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const { setTripType, setCabinClass, swapLocations, searchParams, tripType } =
    useFlightSearch();

  const handleSearch = async () => {
    if (!searchParams || !dateFrom) {
      alert('Please select locations and a departure date');
      return;
    }

    try {
      const payload = {
        ...searchParams,
        departureDate: format(dateFrom, 'yyyy-MM-dd'),
        ...(tripType === 'round-trip' && dateTo
          ? { returnDate: format(dateTo, 'yyyy-MM-dd') }
          : {}),
      };

      console.log('Sending to API:', payload);
      const flightOffers = await appApiService.getFlightOffers(payload);
      console.log('API Results:', flightOffers);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  return (
    <div className={cs.filtersGroup}>
      <div className={cs.dropDownMenusBlock}>
        <UniversalSelector
          collection="flightType"
          className={cs.universalSelector}
          onChange={(id) => setTripType(id as 'one-way' | 'round-trip')}
        />
        <PassengerSelector />
        <UniversalSelector
          collection="cabinClass"
          className={cs.universalSelector}
          onChange={(id) => setCabinClass(id)}
        />
      </div>

      <div className={cs.inputsBlock}>
        <FlightAutocomplete placeholder="From where?" type="from" />

        <div className="absolute left-[35%] -translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            type="button" // Important to prevent form submission
            onClick={swapLocations}
            className="h-8 w-8 rounded-full bg-white border shadow-sm hover:bg-slate-50 transition-transform active:scale-90"
          >
            <ArrowLeftRight className="h-4 w-4 text-blue-600" />
          </Button>
        </div>
        <FlightAutocomplete placeholder="To where?" type="to" />
        <FlightDatePicker date={dateFrom} onChange={setDateFrom} />
        <FlightDatePicker
          date={dateTo}
          onChange={setDateTo}
          disabled={tripType === 'one-way'}
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={!searchParams || !dateFrom}
        className="w-full md:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
      >
        <Search className="h-5 w-5" />
        Search
      </Button>
    </div>
  );
}
