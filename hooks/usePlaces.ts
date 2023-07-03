import { useCallback, useEffect, useState } from "react";

import { Place, PlaceCreate } from "../models";
import { init, insert, fetchAll, fetchOne } from "../database/places";

const usePlaces = () => {
  const [loading, setLoading] = useState(false);

  const createPlaceTable = useCallback(async () => {
    setLoading(true);
    try {
      await init();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const savePlace = useCallback(
    async (place: PlaceCreate) => {
      setLoading(true);
      try {
        await insert(place);
      } catch (error) {
        console.log("error -", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAll();
      return data;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const fetchPlace = useCallback(
    async (id: string): Promise<Place | null> => {
      setLoading(true);
      try {
        const data = await fetchOne(id);
        return data;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );


  useEffect(() => {
    createPlaceTable();
  }, []);

  return {
    savePlace,
    fetchPlaces,
    fetchPlace,
    loading
  };
};

export default usePlaces;
