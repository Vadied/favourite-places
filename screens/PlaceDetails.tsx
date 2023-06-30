import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../models";
import { OutlinedButton } from "../components/ui";
import { Colors } from "../constants";
import { usePlaces } from "../contexts";

type screen = "PlaceDetails";
export type PlaceDetailsNavProps = NativeStackScreenProps<
  RootStackParamList,
  screen
>;
export type PlaceDetailsRouteProps = RouteProp<RootStackParamList, screen>;
type Props = NativeStackScreenProps<RootStackParamList, screen>;
const PlaceDetails = ({ route }: Props) => {
  const { placeId } = route.params;
  const { fetchPlace } = usePlaces();

  useEffect(() => {
    fetchPlace(placeId);
  }, [placeId]);
  const handleShowMap = () => {};
  return (
    <ScrollView>
      <Image style={styles.image} /> 
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}></Text>
        </View>
        <OutlinedButton icon="map" onPress={handleShowMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: { alignItems: "center" },
  image: { height: "35%", minHeight: 300, width: "100%" },
  locationContainer: { justifyContent: "center", alignItems: "center" },
  addressContainer: { padding: 20 },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
