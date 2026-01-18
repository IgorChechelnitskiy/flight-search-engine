import { useState } from 'react';
import { ChevronDown, Minus, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  type IPassengerCounts,
  useFlightSearch,
} from '@/state/context/FlightSearchContext.tsx';

export function PassengerSelector() {
  const { passengerCounts, setPassengerCounts } = useFlightSearch();
  const [draftCounts, setDraftCounts] =
    useState<IPassengerCounts>(passengerCounts);
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setDraftCounts(passengerCounts);
    }
  };

  const totalPassengers =
    passengerCounts.adults + passengerCounts.children + passengerCounts.infants;

  const updateDraft = (key: keyof IPassengerCounts, delta: number) => {
    setDraftCounts((prev) => {
      const newValue = Math.max(key === 'adults' ? 1 : 0, prev[key] + delta);

      if (key === 'infants' && newValue > prev.adults) return prev;
      if (key === 'adults' && newValue < prev.infants) return prev;

      return { ...prev, [key]: newValue };
    });
  };

  const handleDone = () => {
    setPassengerCounts(draftCounts);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex h-10 min-w-25 gap-2 px-3 bg-white border-none hover:bg-slate-100 focus-visible:ring-0"
        >
          <User className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium">{totalPassengers}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-6">
          <PassengerRow
            label="Adults"
            count={draftCounts.adults}
            onUpdate={(d) => updateDraft('adults', d)}
            min={1}
          />
          <PassengerRow
            label="Children"
            sublabel="Aged 2-11"
            count={draftCounts.children}
            onUpdate={(d) => updateDraft('children', d)}
          />
          <PassengerRow
            label="Infants"
            sublabel="Under 2 (on lap)"
            count={draftCounts.infants}
            onUpdate={(d) => updateDraft('infants', d)}
            // Tooltip or helper logic can be added here
            max={draftCounts.adults}
          />

          {draftCounts.infants === draftCounts.adults &&
            draftCounts.infants > 0 && (
              <p className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded">
                Maximum 1 infant per adult allowed.
              </p>
            )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 font-semibold hover:bg-blue-50"
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface PassengerRowProps {
  label: string;
  sublabel?: string;
  count: number;
  onUpdate: (delta: number) => void;
  min?: number;
  max?: number;
}

function PassengerRow({
  label,
  sublabel,
  count,
  onUpdate,
  min = 0,
  max = 9,
}: PassengerRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {sublabel && <span className="text-xs text-slate-500">{sublabel}</span>}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md border-slate-200"
          onClick={() => onUpdate(-1)}
          disabled={count <= min}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center text-sm font-medium">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md border-slate-200"
          onClick={() => onUpdate(1)}
          disabled={count >= max}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
