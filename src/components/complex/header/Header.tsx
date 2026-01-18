import cs from './Header.module.scss';
import { UserMenu } from '@/components/complex/user-menu/UserMenu.tsx';

export default function Header() {
  return (
    <header className={cs.header}>
      <div className={cs.container}>
        <div className={cs.logoGroup}>
          <span className={cs.logoLight}>Flights</span>
          <span className={cs.logoBold}>Booking</span>
        </div>
        <nav className={cs.nav}>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
