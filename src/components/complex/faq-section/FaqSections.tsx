import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import cs from './FAQSection.module.scss';

const faqs = [
  {
    q: 'How do I find the best flight deals?',
    a: "Our platform leverages Amadeus Market Insights to show you trending destinations where traffic and pricing are most favorable. Keep an eye on the 'Trending' badges!",
  },
  {
    q: 'Can I cancel my booking online?',
    a: "Absolutely. You can manage your trips directly from your profile. Please note that cancellation fees are determined by the airline's specific fare conditions.",
  },
  {
    q: 'What does the Popularity Score represent?',
    a: 'The score is calculated using real-time flight traffic data. A higher score means a destination is currently a top choice for travelers departing from your city.',
  },
  {
    q: 'Are there hidden booking fees?',
    a: 'No. The total price displayed at checkout includes all base fares, taxes, and mandatory airport fees. Optional extras like baggage are clearly listed.',
  },
  {
    q: 'Do I need a visa for my destination?',
    a: 'Visa requirements depend on your passport and destination. We provide a summary of travel requirements during the booking process for most major routes.',
  },
  {
    q: 'How early should I arrive at the airport?',
    a: 'We recommend arriving at least 3 hours before international departures and 2 hours for domestic flights to allow for security and boarding.',
  },
];

export function FAQSection() {
  return (
    <section className={cs.faqContainer}>
      <div className={cs.header}>
        <h2 className={cs.title}>Frequently Asked Questions</h2>
        <p className={cs.subtext}>
          Everything you need to know before you take to the skies.
        </p>
      </div>

      <Accordion type="single" collapsible className={cs.accordion}>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cs.item}
          >
            <AccordionTrigger className="text-slate-200">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className={cs.content}>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
