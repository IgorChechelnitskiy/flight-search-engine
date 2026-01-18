import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import storageService from '@/services/StorageService.ts';
import { authService } from '@/services/api/authService.ts';
import { appApiService } from '@/services/api/AppApiService.ts';
import { AppSliceActions as action } from '@/state/slices/AppSlice.ts';

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

  async function getMostTraveledDestinations() {
    dispatch(action.setLoading(true));
    try {
      const travels = await appApiService.getMostTraveledDestinations();
      dispatch(action.refreshTravelDestinations(travels.slice(0, 6)));
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      dispatch(action.setLoading(false));
    }
  }

  return {
    state,
    initAuth,
    getLocations,
    getFlights,
    getMostTraveledDestinations,
  };
}
