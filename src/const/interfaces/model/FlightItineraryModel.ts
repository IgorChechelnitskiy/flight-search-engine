import type { FlightSegmentModel } from '@/const/interfaces/model/FlightSegmentModel.ts';

export interface FlightItineraryModel {
  duration: string;
  segments: FlightSegmentModel[];
}
