import { useState } from 'react';
import {
  ChevronDown,
  Cloud,
  Heart,
  LogOut,
  Settings,
  Ticket,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex h-10 items-center gap-2 px-2 hover:bg-slate-100/50 rounded-full transition-all focus-visible:ring-0',
            open && 'bg-slate-100/80'
          )}
        >
          <Avatar className="h-8 w-8 border-2 border-slate-300 shadow-sm transition-colors">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#1e3a8a] text-slate-200 text-[10px] font-bold tracking-tight">
              IG
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-xs font-semibold text-slate-500">Igor</span>
          </div>

          <ChevronDown
            className={cn(
              'h-3 w-3 text-slate-400 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 mt-1 p-1 rounded-xl shadow-xl border-slate-200 z-[100]"
      >
        <div className="px-3 py-2">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            Account
          </p>
          <p className="text-sm font-semibold text-slate-900 truncate">
            igor@example.com
          </p>
        </div>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700">
            <User className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-medium">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700">
            <Ticket className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-medium">My Bookings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700">
            <Heart className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-medium">Saved Flights</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700">
            <Settings className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-medium">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700">
            <Cloud className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-medium">Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-700">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="font-semibold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
