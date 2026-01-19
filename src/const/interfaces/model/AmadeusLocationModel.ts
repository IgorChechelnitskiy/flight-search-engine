export interface AmadeusLocationModel {
  type: 'location';
  subType: 'CITY' | 'AIRPORT';
  name: string;
  detailedName: string;
  id: string;
  timeZoneOffset: string;
  iataCode: string;
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    regionCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
}
