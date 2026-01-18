import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';

const initialState: IAppSlice = {
  loading: false,
  flights: undefined,
  locations: undefined,
  userLocation: undefined,
  trendingFlights: undefined,
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

function refreshUserLocation(state: IAppSlice, action: PayloadAction<any>) {
  state.userLocation = action?.payload || state.userLocation;
}

function refreshTrendingFlights(
  state: IAppSlice,
  action: PayloadAction<any[]>
) {
  state.trendingFlights = action?.payload || state.trendingFlights;
}

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    setLoading,
    refreshFlights,
    refreshLocations,
    refreshUserLocation,
    refreshTrendingFlights,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
