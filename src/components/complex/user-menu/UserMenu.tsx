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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import cs from './UserMenu.module.scss';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className={cn(cs.triggerBtn, open && cs.open)}>
          <Avatar className={cn(cs.avatar, 'h-8 w-8')}>
            <AvatarImage src="" />
            <AvatarFallback>IG</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className={cs.userName}>Igor</span>
          </div>

          <ChevronDown
            className={cn(cs.chevron, open && cs.rotated, 'h-4 w-4')}
          />
        </button>
      </DropdownMenuTrigger>

      {/* portal prop set to true helps keep it above parent stacking contexts */}
      <DropdownMenuContent
        align="end"
        className={cs.dropdownContent}
        sideOffset={8}
      >
        <div className={cs.labelSection}>
          <p className={cs.accountLabel}>Account</p>
          <p className={cs.email}>igor@example.com</p>
        </div>

        <DropdownMenuSeparator className={cs.separator} />

        <DropdownMenuGroup>
          <DropdownMenuItem className={cs.menuItem}>
            <User size={18} />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={cs.menuItem}>
            <Ticket size={18} />
            <span>My Bookings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={cs.menuItem}>
            <Heart size={18} />
            <span>Saved Flights</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className={cs.separator} />

        <DropdownMenuGroup>
          <DropdownMenuItem className={cs.menuItem}>
            <Settings size={18} />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={cs.menuItem}>
            <Cloud size={18} />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className={cs.separator} />

        <DropdownMenuItem className={cn(cs.menuItem, cs.logout)}>
          <LogOut size={18} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
