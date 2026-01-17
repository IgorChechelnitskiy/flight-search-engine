import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';

const initialState: IAppSlice = {
  loading: false,
  flights: [],
};

function setLoading(state: IAppSlice, action: PayloadAction<boolean>) {
  state.loading = action?.payload || state.loading;
}

// function setIsUserMenuLoading(
//   state: IAppSlice,
//   action: PayloadAction<boolean>
// ) {
//   state.isUserMenuLoading = action?.payload;
// }
//
// function setIsUserOrganizationsLoading(
//   state: IAppSlice,
//   action: PayloadAction<boolean>
// ) {
//   state.isUserOrganizationsLoading = action?.payload;
// }
//
// function refreshToken(state: IAppSlice, action: PayloadAction<any>) {
//   const data = action?.payload || null;
//   storageService.setLocalStorage(StorageKeyEnum.TOKEN, data);
//   state.token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);
// }
//
// function refreshPreferences(
//   state: IAppSlice,
//   action: PayloadAction<PreferencesModel>
// ) {
//   state.preferences = action?.payload || null;
// }
//
function refreshFlights(state: IAppSlice, action: PayloadAction<any[]>) {
  state.flights = action?.payload || state.flights;
}

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    setLoading,
    refreshFlights,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
