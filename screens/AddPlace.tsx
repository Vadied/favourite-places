import React from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { PlaceCreate, RootStackParamList } from "../models";
import { usePlaces } from "../hooks";
import { PlaceForm } from "../components/places";
import { Loader } from "../components/ui";

type screen = "AddPlace";
export type AddPlaceNavProps = NativeStackNavigationProp<
  RootStackParamList,
  screen
>;
export type AddPlaceRouteProps = RouteProp<RootStackParamList, screen>;

type Props = NativeStackScreenProps<RootStackParamList, screen>;
const AddPlace = ({ navigation }: Props) => {
  const { savePlace, loading } = usePlaces();
  const handleCreate = (place: PlaceCreate) => {

    savePlace(place);
    navigation.navigate("AllPlaces");
  };

  if (loading) return <Loader />;

  return <PlaceForm onCreate={handleCreate} />;
};

export default AddPlace;
