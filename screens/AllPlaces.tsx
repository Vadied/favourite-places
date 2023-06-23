import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { Place } from "../models";
import { PlaceList } from "../components/places";

const AllPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    setPlaces([]);
  }, [isFocused]);

  return <PlaceList places={places} />;
};

export default AllPlaces;
