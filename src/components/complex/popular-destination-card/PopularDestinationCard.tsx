import { Card, CardContent } from '@/components/ui/card';
import cs from './PopularDestinationCard.module.scss';

const CITY_NAMES: Record<string, string> = {
  LON: 'London',
  MIA: 'Miami',
  MAD: 'Madrid',
  ATL: 'Atlanta',
  AMS: 'Amsterdam',
  BCN: 'Barcelona',
};

const CITY_IMAGES = [
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800',
  'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=800',
  'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800',
];

interface PopularDestinationCardProps {
  destination: string;
  score: number;
  index: number;
}

export function PopularDestinationCard({
  destination,
  score,
  index,
}: PopularDestinationCardProps) {
  const backgroundImage = CITY_IMAGES[index % CITY_IMAGES.length];
  const cityName = CITY_NAMES[destination] || destination;

  return (
    <Card className={cs.popularCard}>
      <div
        className={cs.bg}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={cs.overlay} />

      <CardContent className={cs.content}>
        <div className={cs.glassPanel}>
          <div className={cs.header}>
            <div>
              <p className={cs.tag}>Trending {destination}</p>
              <h3 className={cs.title}>{cityName}</h3>
            </div>
            <div className={cs.scoreBadge}>{score.toFixed(0)} pts</div>
          </div>

          <div className={cs.footer}>
            <span className={cs.rankText}>Official Partner</span>
            <button className={cs.actionBtn}>Find Flights</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
