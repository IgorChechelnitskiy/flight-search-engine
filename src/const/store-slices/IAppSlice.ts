import type { FlightOfferModel } from '@/const/interfaces/model/FlightOfferModel.ts';
import type { AmadeusLocationModel } from '@/const/interfaces/model/AmadeusLocationModel.ts';
import type { TravelDestinationModel } from '@/const/interfaces/model/TravelDestinationModel.ts';

export interface IAppSlice {
  loading?: boolean;
  flights?: FlightOfferModel[];
  locations?: AmadeusLocationModel[];
  flightResults?: FlightOfferModel[];
  travelDestinations?: TravelDestinationModel[];
}
