import { apiConfigurationService } from './apiConfigurationService';

class AppApiService {
  async getCountryCode() {
    const { data } =
      await apiConfigurationService.get<any[]>('/countries/list');
    return data;
  }
}

export const appApiService = new AppApiService();
