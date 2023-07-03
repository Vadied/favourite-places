import { ILocation } from "./location";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: { location: ILocation };
  Map: { lat: number; lng: number } | undefined;
  PlaceDetails: { placeId: string };
};
