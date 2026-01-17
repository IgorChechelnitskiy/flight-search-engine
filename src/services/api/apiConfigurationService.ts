import axios from 'axios';
import { ApiUrlEnum } from '@/const/enums/ApiUrlEnum.ts';
import storageService from '@/services/StorageService.ts';

export const apiConfigurationService = axios.create({
  baseURL: ApiUrlEnum.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiConfigurationService.interceptors.request.use((config) => {
  const token = storageService.getLocalStorage<string>('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
