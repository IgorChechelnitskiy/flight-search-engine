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

  async getMostTraveledDestinations(
    originCityCode = 'NYC',
    period = '2017-01'
  ) {
    const { data } = await apiConfigurationService.get(
      '/v1/travel/analytics/air-traffic/traveled',
      {
        params: {
          originCityCode: originCityCode.toUpperCase(),
          period: period,
        },
      }
    );
    return data.data;
  }
}

export const appApiService = new AppApiService();
