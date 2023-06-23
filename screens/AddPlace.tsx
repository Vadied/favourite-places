import { StyleSheet } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { Place, RootStackParamList } from "../models";

import { PlaceForm } from "../components/places";

export type AddPlaceNavProps = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;
export type AddPlaceRouteProps = RouteProp<RootStackParamList, "AddPlace">;
type Props = NativeStackScreenProps<RootStackParamList, "AddPlace">;
const AddPlace = ({ navigation }: Props) => {
  const handleCreate = (place: Place) => {
    console.log(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreate={handleCreate} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
