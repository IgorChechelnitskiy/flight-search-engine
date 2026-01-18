import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import storageService from '@/services/StorageService.ts';
import { authService } from '@/services/api/authService.ts';
import { appApiService } from '@/services/api/AppApiService.ts';
import { AppSliceActions as action } from '@/state/slices/AppSlice.ts';
import axios from 'axios';

export default function useAppService() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const dispatch = useAppDispatch();

  async function initAuth() {
    const token = storageService.getLocalStorage('token');
    if (!token) {
      await authService.fetchAndStoreToken();
    }
  }

  async function getLocations(keyword: string) {
    if (!keyword) return;

    dispatch(action.setLoading(true));
    try {
      const locations = await appApiService.getLocations(keyword);
      dispatch(action.refreshLocations(locations));
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      dispatch(action.setLoading(false));
    }
  }

  async function getUserCountryByIP() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const { latitude, longitude } = response.data;
      dispatch(action.refreshUserLocation(response.data));

      if (latitude && longitude) {
        const nearbyAirports = await appApiService.getNearestAirports(
          latitude,
          longitude
        );

        if (nearbyAirports?.length > 0) {
          const mainAirport = nearbyAirports[0];

          // Use the cityCode from the airport to find popular destinations
          const popularDestinations =
            await appApiService.getMostTraveledDestinations(
              mainAirport.address.cityCode
            );

          // Dispatch these to your store to show "Trending from [City]"
          dispatch(action.refreshTrendingFlights(popularDestinations));

          return {
            detectedAirport: mainAirport.iataCode,
            trending: popularDestinations,
          };
        }
      }
    } catch (error) {
      console.error('Location-based discovery failed', error);
    }
  }

  async function getFlights(params: any) {
    if (!params) return;
    dispatch(action.setLoading(true));
    try {
      const flights = await appApiService.getFlightOffers(params);
      dispatch(action.refreshFlights(flights));
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      dispatch(action.setLoading(false));
    }
  }

  async function updateDeals(cityCode: string) {
    const deals = await appApiService.getFlightInspirations(cityCode);
    if (deals && deals.length > 0) {
      dispatch(action.refreshTrendingFlights(deals));
    }
  }

  async function initializeApp() {
    // 1. Initial State: NYC
    await updateDeals('NYC');

    // 2. Background: Upgrade to user's location
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const { latitude, longitude } = response.data;

      const nearby = await appApiService.getNearestAirports(
        latitude,
        longitude
      );
      if (nearby?.length > 0) {
        const userCity = nearby[0].address.cityCode;
        await updateDeals(userCity);
      }
    } catch (e) {
      console.log('Sticking with NYC defaults');
    }
  }

  return {
    state,
    initAuth,
    getLocations,
    getFlights,
    getUserCountryByIP,
    initializeApp,
  };
}
