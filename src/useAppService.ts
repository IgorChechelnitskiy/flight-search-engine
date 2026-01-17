// import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
// import { IAppSlice } from '@/const/interfaces/store-slices/IAppSlice.ts';
// import { AppSliceActions as action } from '@/state/slices/AppSlice.ts';
// import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux.ts';
import axios from 'axios';
import storageService from '@/services/StorageService.ts';
import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';

export default function useAppService() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const dispatch = useAppDispatch();

  async function getToken() {
    const authResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'VhCUaluJGRDoC0z01YFdVefmeg3Ndnkc',
        client_secret: 'C9zAE4dJZBIfiEvv',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    storageService.setLocalStorage(
      'token',
      `Bearer ${authResponse.data.access_token}`
    );
  }

  // function refreshToken(model: any) {
  //   dispatch(action.refreshToken(model));
  // }
  //
  // function refreshPreferences(model: any) {
  //   dispatch(action.refreshPreferences(model));
  //   return model;
  // }

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const data = await appApiService.get();
  //       setCountries(data);
  //     } catch (error) {
  //       console.error('Failed to load countries', error);
  //     }
  //   };
  //   loadData();
  // }, []);

  return {
    ...state,
    getToken,
    // refreshPreferences,
    // refreshToken,
  };
}
