import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';

const initialState: IAppSlice = {
  loading: false,
  flights: undefined,
  locations: undefined,
  flightResults: undefined,
  travelDestinations: undefined,
};

function setLoading(state: IAppSlice, action: PayloadAction<boolean>) {
  state.loading = action.payload;
}

function refreshFlights(state: IAppSlice, action: PayloadAction<any[]>) {
  state.flights = action?.payload || state.flights;
}

function refreshLocations(state: IAppSlice, action: PayloadAction<any[]>) {
  state.locations = action?.payload || state.locations;
}

function refreshFlightResults(state: IAppSlice, action: PayloadAction<any[]>) {
  state.flightResults = action?.payload || state.flightResults;
}

function refreshTravelDestinations(
  state: IAppSlice,
  action: PayloadAction<any[]>
) {
  state.travelDestinations = action?.payload || state.travelDestinations;
}

const AppSlice = createSlice({
  name: StoreSliceEnum.APP,
  initialState,
  reducers: {
    setLoading,
    refreshFlights,
    refreshLocations,
    refreshFlightResults,
    refreshTravelDestinations,
  },
});

export const AppSliceActions = AppSlice.actions;
export default AppSlice;
