import hero from '@/assets/images/HeaderImage.png';
import cs from './MainPage.module.scss';
import useAppService from '@/useAppService.ts';
import { useEffect } from 'react';

export function MainPage() {
  const { state, ...service } = useAppService();

  useEffect(() => {
    service.getLocations('buc');
  }, []);

  console.log('LOCATIONS', state.locations);

  return (
    <div className={cs.mainPage}>
      <img src={hero} alt="hero" />
      <span className="title">Flights Booking</span>
      <div className={cs.searchBlockWrapper}></div>
    </div>
  );
}
