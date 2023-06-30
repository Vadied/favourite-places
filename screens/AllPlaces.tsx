import React, { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";

import { Place } from "../models";
import { PlaceList } from "../components/places";
import { usePlaces } from "../contexts";

const AllPlaces = () => {
  const { fetchPlaces } = usePlaces();
  const isFocused = useIsFocused();

  const [places, setPlaces] = useState<Place[]>([]);

  const getPlaces = useCallback(async () => {
    if (!isFocused) return;

    const places = await fetchPlaces();
    setPlaces(places);
  }, [isFocused, fetchPlaces]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return <PlaceList places={places} />;
};

export default AllPlaces;
