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
      {/* 1. HERO */}
      <section className={cs.heroSection}>
        <div className={cs.glowOrb} aria-hidden="true" />
        <div className={cs.heroContent}>
          <h1 className={cs.heroTitle}>
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

      {/* 2. SEARCH (Overlaps Hero) */}
      <section className={cs.searchContainer}>
        <FlightSearchProvider>
          <FiltersGroup />
        </FlightSearchProvider>
      </section>

      {/* 3. RESULTS */}
      <section className={cs.resultsSection}>
        {state.loading ? (
          <FlightResultsSkeleton />
        ) : (
          <FlightResults data={state?.flightResults} />
        )}
      </section>

      {/* 4. DESTINATIONS (Fixed Tailwind conflict) */}
      <section className={cs.destinationsSection}>
        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white/5 rounded-xl animate-pulse"
              />
            ))}
          </div>
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

      {/* 5. FAQ */}
      <section className={cs.faqSection}>
        <FAQSection />
      </section>

      <Footer />
    </main>
  );
}
