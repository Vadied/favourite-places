import { ILocation } from "./location";

export class PlaceCreate {
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    lat: number,
    lng: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}

export class Place extends PlaceCreate {
  id: string;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    lat: number,
    lng: number,
    id: string
  ) {
    super(title, imageUri, address, lat, lng);
    this.id = id;
  }
}
