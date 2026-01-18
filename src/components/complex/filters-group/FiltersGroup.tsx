import cs from './FiltersGroup.module.scss';
import { useState } from 'react';
import { UniversalSelector } from '@/components/complex/universal-selector/UniversalSelector.tsx';
import { PassengerSelector } from '@/components/complex/passenger-selector/PassengerSelector.tsx';
import { FlightAutocomplete } from '@/components/complex/flight-autocomplite/FlightAutocomplite.tsx';
import { FlightDatePicker } from '@/components/complex/flight-datepicker/FlightDatepicker.tsx';
import { ArrowLeftRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useFlightSearch } from '@/state/context/FlightSearchContext.tsx';
import { appApiService } from '@/services/api/AppApiService.ts';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { AppSliceActions as actions } from '@/state/slices/AppSlice.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

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

      console.log('Sending to API:', payload);
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
        <UniversalSelector
          collection="currency"
          className={cs.universalSelector}
          onChange={(id) => setCurrency(id)}
        />
      </div>

      <div className={cs.inputsBlock}>
        <FlightAutocomplete placeholder="From where?" type="from" />

        <div className="absolute left-[35%] -translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            type="button"
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

export function FiltersGroupSkeleton() {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-md space-y-6">
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-[140px] rounded-md" />
        <Skeleton className="h-10 w-[140px] rounded-md" />
        <Skeleton className="h-10 w-[120px] rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-12 w-full md:w-40 rounded-lg" />
      </div>
    </div>
  );
}
