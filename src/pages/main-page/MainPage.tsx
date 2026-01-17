import hero from '@/assets/images/HeaderImage.png';
import cs from './MainPage.module.scss';

export function MainPage() {
  // const [flights, setFlights] = useState([]);
  // const [loading, setLoading] = useState(false);
  //
  // console.log('flights', flights);
  // console.log('loading', loading);

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     setLoading(true);
  //     try {
  //       // 1. Get Access Token
  //       const authResponse = await axios.post(
  //         'https://test.api.amadeus.com/v1/security/oauth2/token',
  //         new URLSearchParams({
  //           grant_type: 'client_credentials',
  //           client_id: 'VhCUaluJGRDoC0z01YFdVefmeg3Ndnkc',
  //           client_secret: 'C9zAE4dJZBIfiEvv',
  //         }),
  //         { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  //       );
  //
  //       const token = authResponse.data.access_token;
  //
  //       // 2. Fetch Flight Offers (Example: NYC to LON)
  //       const flightResponse = await axios.get(
  //         'https://test.api.amadeus.com/v2/shopping/flight-offers',
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //           params: {
  //             originLocationCode: 'NYC',
  //             destinationLocationCode: 'LON',
  //             departureDate: '2026-06-01', // Use a future date
  //             adults: '1',
  //             max: '5',
  //           },
  //         }
  //       );
  //
  //       setFlights(flightResponse.data.data);
  //     } catch (error) {
  //       console.error('Error fetching flights:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchFlights();
  // }, []); // Empty array means this runs once on mount

  return (
    <div className={cs.mainPage}>
      <img src={hero} alt="hero" />
      <span className="title">Flights Booking</span>
      <div className={cs.searchBlockWrapper}></div>
    </div>
  );
}
