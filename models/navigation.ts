import { ILocation } from "./location";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: { location: ILocation };
  Map: undefined;
  PlaceDetails: { placeId: string };
};
