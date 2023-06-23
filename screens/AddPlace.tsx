import React from "react";
import { StyleSheet } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { PlaceCreate, RootStackParamList } from "../models";

import { PlaceForm } from "../components/places";
import { usePlaces } from "../contexts";

export type AddPlaceNavProps = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;
export type AddPlaceRouteProps = RouteProp<RootStackParamList, "AddPlace">;

type Props = NativeStackScreenProps<RootStackParamList, "AddPlace">;
const AddPlace = ({ navigation }: Props) => {
  const { savePlace } = usePlaces();
  const handleCreate = (place: PlaceCreate) => {
    savePlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreate={handleCreate} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
