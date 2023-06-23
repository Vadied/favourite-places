import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Place, PlaceCreate } from "../models";
import { init, insert, fetchAll } from "../database/places";

export type PlacesContext = {
  loading: boolean;
  savePlace(place: PlaceCreate): Promise<void>;
  fetchPlaces(): Promise<Place[]>;
};
const Context = createContext({} as PlacesContext);

type Props = { children: ReactNode };
export const PlacesContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  const createPlaceTable = async () => {
    setLoading(true);
    try {
      await init();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const savePlace = async (place: PlaceCreate) => {
    setLoading(true);
    try {
      await insert(place);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async () => {
    console.log("fetch all")
    setLoading(true);
    try {
      const data = await fetchAll();
      console.log("fetch data", data)
      return data;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    createPlaceTable();
  }, []);

  const value = { savePlace, fetchPlaces, loading };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default () => useContext(Context);
