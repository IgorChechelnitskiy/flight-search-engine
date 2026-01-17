import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';

const initialState: IAppSlice = {
  loading: false,
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
// function refreshUserOrganizations(
//   state: IAppSlice,
//   action: PayloadAction<UserOrganizationModel[]>
// ) {
//   state.userOrganizations = action?.payload || state.userOrganizations;
// }

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    setLoading,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
