import { apiConfigurationService } from './apiConfigurationService';

class AppApiService {
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
