import axios from 'axios';
import storageService from '@/services/StorageService.ts';

const AMADEUS_AUTH_URL =
  'https://test.api.amadeus.com/v1/security/oauth2/token';

export const authService = {
  async fetchAndStoreToken() {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'VhCUaluJGRDoC0z01YFdVefmeg3Ndnkc');
      params.append('client_secret', 'C9zAE4dJZBIfiEvv');

      const { data } = await axios.post(AMADEUS_AUTH_URL, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      storageService.setLocalStorage('token', `Bearer ${data.access_token}`);
      return data.access_token;
    } catch (error) {
      console.error('Failed to fetch Amadeus token', error);
      throw error;
    }
  },
};
