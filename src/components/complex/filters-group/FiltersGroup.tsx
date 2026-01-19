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
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { AppSliceActions as actions } from '@/state/slices/AppSlice.ts';

export function FiltersGroup() {
  const dispatch = useDispatch();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const {
    setCurrency,
    setTripType,
    setCabinClass,
    swapLocations,
    searchParams,
    tripType,
    currency,
  } = useFlightSearch();

  const handleSearch = async () => {
    if (!searchParams || !dateFrom) {
      alert('Please select locations and a departure date');
      return;
    }
    dispatch(actions.setLoading(true));
    try {
      const payload = {
        ...searchParams,
        currencyCode: currency,
        departureDate: format(dateFrom, 'yyyy-MM-dd'),
        ...(tripType === 'round-trip' && dateTo
          ? { returnDate: format(dateTo, 'yyyy-MM-dd') }
          : {}),
        adults: '1',
      };

      const flightOffers = await appApiService.getFlightOffers(payload);
      dispatch(actions.refreshFlightResults(flightOffers || []));
    } catch (error) {
      console.error('Search failed', error);
      dispatch(actions.refreshFlightResults([]));
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  return (
    <div className={cs.filtersGroup}>
      {/* Top Row: Selectors */}
      <div className={cs.dropDownMenusBlock}>
        <UniversalSelector
          collection="flightType"
          onChange={(id) => setTripType(id as 'one-way' | 'round-trip')}
        />
        <PassengerSelector />
        <UniversalSelector
          collection="cabinClass"
          onChange={(id) => setCabinClass(id)}
        />
        <UniversalSelector
          collection="currency"
          onChange={(id) => setCurrency(id)}
        />
      </div>
      <div className={cs.inputsBlock}>
        <FlightAutocomplete placeholder="From where?" type="from" />

        <div className={cs.swapButtonWrapper}>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={swapLocations}
            className="h-10 w-10 rounded-full bg-slate-900 border-white/20 shadow-xl hover:bg-slate-800 transition-all active:scale-90"
          >
            <ArrowLeftRight className="h-4 w-4 text-blue-400" />
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
        className={cs.searchBtn}
      >
        <Search className="h-5 w-5 mr-2" />
        Search Flights
      </Button>
    </div>
  );
}
