import {
  ArrowLeft,
  ArrowLeftRight,
  Banknote,
  Check,
  ChevronDown,
  Coins,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ISelectorOption } from '@/const/interfaces/components/ISelectorOption.ts';
import { useFlightSearch } from '@/state/context/FlightSearchContext.tsx';

const COLLECTIONS: Record<string, ISelectorOption[]> = {
  flightType: [
    {
      id: 'one-way',
      label: 'One way',
      icon: <ArrowLeft className="h-4 w-4" />,
    },
    {
      id: 'round-trip',
      label: 'Round trip',
      icon: <ArrowLeftRight className="h-4 w-4" />,
    },
  ],
  cabinClass: [
    { id: 'ECONOMY', label: 'Economy' },
    { id: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
    { id: 'BUSINESS', label: 'Business' },
    { id: 'FIRST', label: 'First' },
  ],
  currency: [
    {
      id: 'USD',
      label: 'USD $',
      icon: <Banknote className="h-4 w-4 text-green-600" />,
    },
    {
      id: 'EUR',
      label: 'EUR €',
      icon: <Coins className="h-4 w-4 text-blue-600" />,
    },
    {
      id: 'GBP',
      label: 'GBP £',
      icon: <CreditCard className="h-4 w-4 text-purple-600" />,
    },
  ],
};

interface UniversalSelectorProps {
  collection: keyof typeof COLLECTIONS;
  onChange?: (id: string) => void;
  className?: string;
}

export function UniversalSelector({
  collection,
  onChange,
  className,
}: UniversalSelectorProps) {
  const options = COLLECTIONS[collection];

  const { currency, tripType, cabinClass } = useFlightSearch();

  const getSelectedId = () => {
    if (collection === 'currency') return currency;
    if (collection === 'flightType') return tripType;
    if (collection === 'cabinClass') return cabinClass;
    return options[0].id;
  };

  const selectedId = getSelectedId();
  const current = options.find((opt) => opt.id === selectedId) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex h-10 min-w-[140px] justify-between gap-2 px-3 bg-white border-none hover:bg-slate-100 focus:ring-0',
            className
          )}
        >
          <div className="flex items-center gap-2">
            {current.icon && <span>{current.icon}</span>}
            <span className="text-sm font-medium">{current.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[180px] z-[100]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => {
              if (onChange) onChange(option.id);
            }}
            className="flex items-center justify-between cursor-pointer focus:bg-slate-100"
          >
            <div className="flex items-center gap-2">
              {option.icon && <span>{option.icon}</span>}
              <span
                className={cn(
                  selectedId === option.id && 'font-semibold text-blue-600'
                )}
              >
                {option.label}
              </span>
            </div>
            {selectedId === option.id && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
