import { useState } from 'react';
import { ArrowLeft, ArrowLeftRight, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ISelectorOption } from '@/const/interfaces/components/ISelectorOption.ts';

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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(options[0].id);
  const current = options.find((opt) => opt.id === selectedId) || options[0];
  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onChange) onChange(id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex h-10 min-w-50 gap-2 px-3 bg-white border-none hover:bg-slate-100 focus-visible:ring-0',
            className
          )}
        >
          {current.icon && <span>{current.icon}</span>}
          <span className="text-sm font-medium">{current.label}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[180px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span
              className={cn(
                selectedId === option.id && 'font-semibold text-blue-600'
              )}
            >
              {option.label}
            </span>
            {selectedId === option.id && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
