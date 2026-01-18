import cs from './MainPage.module.scss';
import { FlightSearchProvider } from '@/state/context/FlightSearchContext';
import { FiltersGroup } from '@/components/complex/filters-group/FiltersGroup.tsx';
import { FlightResults } from '@/components/complex/flight-results/FlightResults.tsx';
import { useAppSelector } from '@/hooks/redux.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';
import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';

export function MainPage() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  return (
    <main className={cs.mainPage}>
      {/* Hero Section using <section> and h1 */}
      <section className={cs.heroSection} aria-labelledby="hero-title">
        <div className={cs.glowOrb} aria-hidden="true" />

        <div className={cs.heroContent}>
          <h1 id="hero-title" className={cs.heroTitle}>
            <span className={cs.titleLight}>Flights</span>
            <span className={cs.titleBold}>Booking</span>
          </h1>

          <div className={cs.heroSubtitle}>
            <span className={cs.line} aria-hidden="true" />
            <p>Explore the world with ease</p>
            <span className={cs.line} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Search area wrapped in a section with a hidden heading for accessibility */}
      <section
        className={cs.searchContainer}
        aria-label="Flight search filters"
      >
        <h2 className="sr-only">Search Filters</h2>
        <FlightSearchProvider>
          <FiltersGroup />
        </FlightSearchProvider>
      </section>

      {/* Future Content Placeholder */}
      <section className={cs.resultsSection}>
        <FlightResults data={state?.flightResults} />
      </section>
    </main>
  );
}
