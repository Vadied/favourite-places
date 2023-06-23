import { ILocation } from "./location";

export interface IPlaceCreate {
  title: string;
  imageUri: string;
  address: string;
  location: ILocation;
}
export interface IPlace extends IPlaceCreate {
  id: string;
}

export class Place {
  id: string;
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
    this.id = new Date().toString() + Math.random().toString();
  }
}
