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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        storageService.clearLocalStorage();

        const newToken = await authService.fetchAndStoreToken();

        originalRequest.headers.Authorization = newToken;

        return apiConfigurationService(originalRequest);
      } catch (refreshError) {
        storageService.clearLocalStorage();
        console.error('Token refresh flow failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
