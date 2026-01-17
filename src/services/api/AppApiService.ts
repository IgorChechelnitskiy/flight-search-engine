import { apiConfigurationService } from './apiConfigurationService';

class AppApiService {
  /**
   * Finds airports and cities based on a keyword (Autocomplete)
   * @param keyword - The string the user is typing (e.g., 'LON')
   */
  async getLocations(keyword: string) {
    const { data } = await apiConfigurationService.get(
      '/reference-data/locations',
      {
        params: {
          subType: 'CITY,AIRPORT',
          keyword: keyword.toUpperCase(), // Amadeus prefers uppercase
          'page[limit]': 20,
        },
      }
    );

    return data.data;
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
}

export const appApiService = new AppApiService();
