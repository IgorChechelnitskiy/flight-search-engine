import { EllipsisVertical } from 'lucide-react';

import cs from './UserMenu.module.scss';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IUserMenu } from '@/const/interfaces/IUserMenu.ts';
import { type JSX } from 'react';

export function UserMenu({ user, isLoading }: IUserMenu): JSX.Element {
  // const { logOut } = useAppService();
  // const navigate = useNavigate();
  // const { openConfirmationDialog } = useDialogService();

  // async function handleLogout() {
  //   setTimeout(async () => {
  //     const confirmedLogOut = await openConfirmationDialog({
  //       headerTitle: 'Logging out',
  //       text: `You are about to log out from your account.`,
  //       primaryButtonValue: 'Log Out',
  //       secondaryButtonValue: 'Cancel',
  //     });
  //
  //     if (!confirmedLogOut) return;
  //
  //     logOut();
  //   }, 100);
  // }

  return (
    <SidebarMenu className={cs.sidebarMenu}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <div className={cs.skeletonBlock}>
                  <Skeleton className={cs.skeletonRound} />
                  <div className={cs.skeletonBars}>
                    <Skeleton className={cs.skeletonLongBar} />
                    <Skeleton className={cs.skeletonShortBar} />
                  </div>
                </div>
              ) : (
                ((
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      {user?.thumbnail && (
                        <AvatarImage src={user.thumbnail} alt="avatar" />
                      )}

                      {/*<AvatarFallback className="rounded-lg">*/}
                      {/*  {getInitials(*/}
                      {/*    undefined,*/}
                      {/*    user?.firstName,*/}
                      {/*    user?.lastName*/}
                      {/*  )}*/}
                      {/*</AvatarFallback>*/}
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span
                        className={`${cs.userText} she-text`}
                      >{`${user?.firstName} ${user?.lastName}`}</span>
                      <span className={`${cs.userText} she-subtext`}>
                        {user?.email}
                      </span>
                    </div>
                    <EllipsisVertical
                      size={24}
                      color="#71717A"
                      style={{ maxWidth: '24px' }}
                    />
                  </>
                ) as JSX.Element)
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-48 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cs.dropdownMenuItem}
                // onClick={() => navigate('/profile')}
              >
                {/*<SheIcon*/}
                {/*  className={cs.dropdownMenuItemIcon}*/}
                {/*  icon={UserRoundCog}*/}
                {/*  maxWidth="20px"*/}
                {/*  color="#71717A"*/}
                {/*/>*/}
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Account
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                {/*<SheIcon*/}
                {/*  className={cs.dropdownMenuItemIcon}*/}
                {/*  icon={UserRoundPlus}*/}
                {/*  maxWidth="20px"*/}
                {/*  color="#71717A"*/}
                {/*/>*/}
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Invitations
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                {/*<SheIcon*/}
                {/*  className={cs.dropdownMenuItemIcon}*/}
                {/*  icon={CreditCard}*/}
                {/*  maxWidth="20px"*/}
                {/*  color="#71717A"*/}
                {/*/>*/}
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Billing
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                {/*<SheIcon*/}
                {/*  className={cs.dropdownMenuItemIcon}*/}
                {/*  icon={Cog}*/}
                {/*  maxWidth="20px"*/}
                {/*  color="#71717A"*/}
                {/*/>*/}
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Administration
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cs.dropdownMenuItemLogOut}
              // onClick={handleLogout}
            >
              {/*<SheIcon*/}
              {/*  className={cs.dropdownMenuItemIcon}*/}
              {/*  icon={LogOut}*/}
              {/*  maxWidth="20px"*/}
              {/*  color="#71717A"*/}
              {/*/>*/}
              <span className={`${cs.dropdownMenuItemText} she-text`}>
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
