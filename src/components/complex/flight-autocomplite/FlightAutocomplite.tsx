import { useEffect, useState } from 'react';
import { Building2, Loader2, MapPin, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import {
  type FlightLocation,
  useFlightSearch,
} from '@/state/context/FlightSearchContext.tsx';

interface Props {
  type: 'from' | 'to';
  placeholder: string;
}

export function FlightAutocomplete({ type, placeholder }: Props) {
  const {
    getSuggestions,
    fromLocation,
    toLocation,
    setFromLocation,
    setToLocation,
  } = useFlightSearch();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FlightLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const currentSelection = type === 'from' ? fromLocation : toLocation;
  const selectionLabel = currentSelection
    ? `${currentSelection.address.cityName} (${currentSelection.iataCode})`
    : '';
  const isQuerySameAsSelection = query === selectionLabel;

  useEffect(() => {
    if (currentSelection) {
      setQuery(selectionLabel);
    } else {
      setQuery('');
    }
  }, [currentSelection, selectionLabel]);

  useEffect(() => {
    if (isSelecting || query.length < 2 || isQuerySameAsSelection) {
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getSuggestions(query);
        setResults(data);
        setOpen(data.length > 0 && !isQuerySameAsSelection);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, isSelecting, getSuggestions, isQuerySameAsSelection]);

  const handleSelect = (loc: FlightLocation) => {
    setIsSelecting(true);
    if (type === 'from') setFromLocation(loc);
    else setToLocation(loc);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => {
                setIsSelecting(false);
                setQuery(e.target.value);
              }}
              onFocus={() => {
                if (
                  query.length >= 2 &&
                  results.length > 0 &&
                  !isQuerySameAsSelection
                ) {
                  setOpen(true);
                }
              }}
              placeholder={placeholder}
              className="pl-10 h-12 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm text-base"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
            )}
          </div>
        </PopoverAnchor>

        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto border border-slate-200 shadow-xl mt-1 bg-white z-50"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <ul className="py-2">
            {results.map((loc) => (
              <li
                key={`${loc.iataCode}-${loc.id}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleSelect(loc);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  {loc.subType === 'CITY' ? (
                    <Building2 className="h-4 w-4" />
                  ) : (
                    <Plane className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-slate-900">
                    {loc.subType === 'AIRPORT'
                      ? loc.name
                      : loc.address.cityName}{' '}
                    ({loc.iataCode})
                  </span>
                  <span className="text-xs text-slate-500 uppercase">
                    {loc.address.countryName}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
