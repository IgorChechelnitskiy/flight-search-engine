import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FlightDatePickerProps {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function FlightDatePicker({
  date,
  onChange,
  placeholder = 'Pick a date',
}: FlightDatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onChange(selectedDate);
    // Explicitly close the popover after selection
    if (selectedDate) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            // h-12 matches your Autocomplete Input exactly
            'h-12 min-w-50 justify-start text-left font-normal px-3',
            'bg-white border-none shadow-sm hover:bg-slate-50',
            !date && 'text-slate-400'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
          {date ? (
            <span className="text-slate-900">{format(date, 'PPP')}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none shadow-xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // Prevent past dates
        />
      </PopoverContent>
    </Popover>
  );
}
