import cs from './FiltersGroup.module.scss';
import { useState } from 'react';
import { UniversalSelector } from '@/components/complex/universal-selector/UniversalSelector.tsx';
import { PassengerSelector } from '@/components/complex/passenger-selector/PassengerSelector.tsx';
import { FlightAutocomplete } from '@/components/complex/flight-autocomplite/FlightAutocomplite.tsx';
import { FlightDatePicker } from '@/components/complex/flight-datepicker/FlightDatepicker.tsx';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useFlightSearch } from '@/state/context/FlightSearchContext.tsx';

export function FiltersGroup() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const { swapLocations } = useFlightSearch();

  return (
    <div className={cs.filtersGroup}>
      <div className={cs.dropDownMenusBlock}>
        <UniversalSelector
          collection="flightType"
          className={cs.universalSelector}
        />
        <PassengerSelector />
        <UniversalSelector
          collection="cabinClass"
          className={cs.universalSelector}
        />
      </div>
      <div className={cs.inputsBlock}>
        <FlightAutocomplete placeholder="From where?" type="from" />

        {/* Swap Button */}
        <div className="absolute left-[35%] -translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={swapLocations}
            className="h-8 w-8 rounded-full bg-white border shadow-sm hover:bg-slate-50 transition-transform active:scale-90"
          >
            <ArrowLeftRight className="h-4 w-4 text-blue-600" />
          </Button>
        </div>

        <FlightAutocomplete placeholder="To where?" type="to" />
        <FlightDatePicker date={dateFrom} onChange={setDateFrom} />
        <FlightDatePicker date={dateTo} onChange={setDateTo} />
      </div>
    </div>
  );
}
