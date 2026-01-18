import axios from 'axios';
import storageService from '@/services/StorageService.ts';
import { authService } from '@/services/api/authService.ts';
import { ApiUrlEnum } from '@/const/enums/ApiUrlEnum.ts';

export const apiConfigurationService = axios.create({
  baseURL: ApiUrlEnum.BASE_URL,
});

apiConfigurationService.interceptors.request.use(
  async (config) => {
    let token = storageService.getLocalStorage<string>('token');

    if (!token) {
      try {
        token = await authService.fetchAndStoreToken();
      } catch (error) {
        console.error(
          'Authentication failed, could not attach Bearer token',
          error
        );
      }
    }

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiConfigurationService.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already tried to retry this specific request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request so we don't loop infinitely

      try {
        // 1. Clear the old stale token
        storageService.clearLocalStorage();

        // 2. Fetch a fresh token and store it
        // Note: authService.fetchAndStoreToken() should handle the localStorage.set
        const newToken = await authService.fetchAndStoreToken();

        // 3. Update the failed request header with the new token
        originalRequest.headers.Authorization = newToken;

        // 4. Retry the original request with the new token
        return apiConfigurationService(originalRequest);
      } catch (refreshError) {
        // If the refresh itself fails, clear everything and redirect to login if necessary
        storageService.clearLocalStorage();
        console.error('Token refresh flow failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
