import { ILocation } from "./location";

export class PlaceCreate {
  title: string;
  imageUri: string;
  address: string;
  location: ILocation;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: ILocation
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.141241, lng: 127.121 }
  }
}

export class Place extends PlaceCreate {
  id: string;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: ILocation,
    id: string
  ) {
    super(title, imageUri, address, location);
    this.id = id;
  }
}
