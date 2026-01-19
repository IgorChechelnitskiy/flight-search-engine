import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';
import type { IAppSlice } from '@/const/store-slices/IAppSlice.ts';
import type {
  FlightOfferModel
} from '@/const/interfaces/model/FlightOfferModel.ts';
import type {
  AmadeusLocationModel
} from '@/const/interfaces/model/AmadeusLocationModel.ts';
import type {
  TravelDestinationModel
} from '@/const/interfaces/model/TravelDestinationModel.ts';

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

function refreshFlights(
  state: IAppSlice,
  action: PayloadAction<FlightOfferModel[]>
) {
  state.flights = action?.payload || state.flights;
}

function refreshLocations(
  state: IAppSlice,
  action: PayloadAction<AmadeusLocationModel[]>
) {
  state.locations = action?.payload || state.locations;
}

function refreshFlightResults(
  state: IAppSlice,
  action: PayloadAction<FlightOfferModel[]>
) {
  state.flightResults = action?.payload || state.flightResults;
}

function refreshTravelDestinations(
  state: IAppSlice,
  action: PayloadAction<TravelDestinationModel[]>
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
