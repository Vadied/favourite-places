import React, { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";

import { Place } from "../models";
import { usePlaces } from "../hooks";
import { PlaceList } from "../components/places";
import { Loader } from "../components/ui";

const AllPlaces = () => {
  const { fetchPlaces, loading } = usePlaces();
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

  if (loading) return <Loader />;

  return <PlaceList places={places} />;
};

export default AllPlaces;
