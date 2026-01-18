import cs from './MainPage.module.scss';
import { FlightSearchProvider } from '@/state/context/FlightSearchContext';
import { FiltersGroup } from '@/components/complex/filters-group/FiltersGroup.tsx';
import {
  FlightResults,
  FlightResultsSkeleton,
} from '@/components/complex/flight-results/FlightResults.tsx';
import { useEffect } from 'react';
import useAppService from '@/useAppService.ts';
import { PopularDestinationCard } from '@/components/complex/popular-destination-card/PopularDestinationCard.tsx';
import { FAQSection } from '@/components/complex/faq-section/FaqSections.tsx';
import { Footer } from '@/components/complex/footer/Footer.tsx';

export function MainPage() {
  const { state, ...service } = useAppService();

  useEffect(() => {
    service.getMostTraveledDestinations();
  }, []);

  return (
    <main className={cs.mainPage}>
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
      <section
        className={cs.searchContainer}
        aria-label="Flight search filters"
      >
        <h2 className="sr-only">Search Filters</h2>
        <FlightSearchProvider>
          <FiltersGroup />
        </FlightSearchProvider>
      </section>
      <section className={cs.resultsSection}>
        <div className={cs.resultsContainer}>
          {state.loading ? (
            <FlightResultsSkeleton />
          ) : (
            <FlightResults data={state?.flightResults} />
          )}
        </div>
      </section>
      <section className="container max-w-[1200px] mx-auto py-12 px-4">
        {state.loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className={cs.skeletonCard} />
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.travelDestinations?.map((item: any, index: number) => (
              <PopularDestinationCard
                key={item.destination}
                destination={item.destination}
                score={item.analytics?.travelers?.score || 0}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
      <section>
        <FAQSection />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
