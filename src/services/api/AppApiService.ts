import { apiConfigurationService } from './apiConfigurationService';

class AppApiService {
  /**
   * Finds airports and cities based on a keyword (Autocomplete)
   */
  async getLocations(keyword: string) {
    const { data } = await apiConfigurationService.get(
      'v1/reference-data/locations', // Updated to include v1 for clarity
      {
        params: {
          subType: 'CITY,AIRPORT',
          keyword: keyword.toUpperCase(),
          'page[limit]': 20,
        },
      }
    );
    return data.data;
  }

  /**
   * NEW: Finds the nearest major airports based on coordinates
   * @param lat - Latitude (e.g., 44.3192)
   * @param lon - Longitude (e.g., 28.5956)
   */
  async getNearestAirports(lat: number, lon: number) {
    try {
      const { data } = await apiConfigurationService.get(
        'v1/reference-data/locations/airports',
        {
          params: {
            latitude: lat,
            longitude: lon,
            radius: 500, // Search within 500km
            'page[limit]': 5, // Get top 5 relevant airports
            sort: 'relevance', // Balance of distance and flight traffic
          },
        }
      );

      // Returns an array of airports. data.data[0] is the most relevant.
      console.log('DATA', data.data[0]);
      return data.data;
    } catch (error) {
      console.error('Error fetching nearest airports', error);
      return [];
    }
  }

  /**
   * Fetches actual flight offers (Prices)
   */
  async getFlightOffers(params: any) {
    const { data } = await apiConfigurationService.get(
      '/v2/shopping/flight-offers',
      {
        params,
      }
    );
    return data.data;
  }

  /**
   * Fetches the most traveled destinations from a specific city
   * @param cityCode - The IATA city code (e.g., 'IST')
   */
  async getMostTraveledDestinations(cityCode: string) {
    try {
      const { data } = await apiConfigurationService.get(
        'v1/travel/analytics/air-traffic/traveled',
        {
          params: {
            originCityCode: 'NYC',
            period: '2025-12', // Example period, or leave empty for last 12 months
            'page[limit]': 10,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching most traveled destinations', error);
      return [];
    }
  }

  async getFlightInspirations(origin: string) {
    const { data } = await apiConfigurationService.get(
      'v1/shopping/flight-destinations',
      {
        params: {
          origin: origin,
          oneWay: false,
        },
      }
    );
    return data.data; // Array of inspiration objects
  }
}

export const appApiService = new AppApiService();
