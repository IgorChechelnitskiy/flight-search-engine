import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';

const initialState: IAppSlice = {
  loading: false,
  flights: [],
  locations: [],
};

function setLoading(state: IAppSlice, action: PayloadAction<boolean>) {
  state.loading = action?.payload || state.loading;
}

function refreshFlights(state: IAppSlice, action: PayloadAction<any[]>) {
  state.flights = action?.payload || state.flights;
}

function refreshLocations(state: IAppSlice, action: PayloadAction<any[]>) {
  state.locations = action?.payload || state.locations;
}

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    setLoading,
    refreshFlights,
    refreshLocations,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
