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
            <span className={cs.line} />
            <p>Explore the world with ease</p>
            <span className={cs.line} />
          </div>
        </div>
      </section>

      <section className={cs.searchContainer}>
        <h2 className="sr-only">Search Filters</h2>
        <FlightSearchProvider>
          <FiltersGroup />
        </FlightSearchProvider>
      </section>

      <section className={cs.resultsSection}>
        {state.loading ? (
          <FlightResultsSkeleton />
        ) : (
          <FlightResults data={state?.flightResults} />
        )}
      </section>

      <section className={cs.destinationsSection}>
        <div className={cs.destinationsGrid}>
          {state.loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={cs.skeletonCard} />
              ))
            : state.travelDestinations?.map((item: any, index: number) => (
                <PopularDestinationCard
                  key={item.destination}
                  destination={item.destination}
                  score={item.analytics?.travelers?.score || 0}
                  index={index}
                />
              ))}
        </div>
      </section>

      <section className={cs.faqSection}>
        <FAQSection />
      </section>

      <Footer />
    </main>
  );
}
