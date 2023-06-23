import { ILocation } from "../models";

export const getMapPreview = ({ lat, lng }: ILocation) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${MAP_API_KEY}`;
};

export const getAddress = async ({ lat, lng }: ILocation) => {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`
  );

  if (!result.ok) throw new Error("Failed to fetch address!");

  const data: google.maps.GeocoderResponse = await result.json();
  return data.results[0].formatted_address;
};
