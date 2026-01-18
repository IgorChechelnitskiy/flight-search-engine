import cs from './Header.module.scss';

export default function Header() {
  return (
    <header className={cs.header}>
      <div className={cs.container}>
        <div className={cs.logoGroup}>
          <span className={cs.logoLight}>Flights</span>
          <span className={cs.logoBold}>Booking</span>
        </div>

        <nav className={cs.nav}>
          {/* Add navigation links here later if needed */}
          <div className={cs.userPlaceholder}>
            {/* <UserMenu /> */}
            <div className={cs.avatarCircle} />
          </div>
        </nav>
      </div>
    </header>
  );
}
