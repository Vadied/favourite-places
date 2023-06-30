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

type screen = "AddPlace";
export type AddPlaceNavProps = NativeStackNavigationProp<
  RootStackParamList,
  screen
>;
export type AddPlaceRouteProps = RouteProp<RootStackParamList, screen>;

type Props = NativeStackScreenProps<RootStackParamList, screen>;
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
