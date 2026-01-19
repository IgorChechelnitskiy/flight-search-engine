import type {
  FlightItineraryModel
} from '@/const/interfaces/model/FlightItineraryModel.ts';
import type {
  AmadeusPriceModel
} from '@/const/interfaces/model/AmadeusPriceModel.ts';

export interface FlightOfferModel {
  type: 'flight-offer';
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: FlightItineraryModel[];
  price: AmadeusPriceModel;
  validatingAirlineCodes: string[];
}
