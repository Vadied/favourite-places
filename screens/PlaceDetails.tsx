import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ILocation, Place, RootStackParamList } from "../models";
import { Colors } from "../constants";
import { usePlaces } from "../hooks";
import { OutlinedButton, Image, Loader } from "../components/ui";

type screen = "PlaceDetails";
export type PlaceDetailsNavProps = NativeStackScreenProps<
  RootStackParamList,
  screen
>;
export type PlaceDetailsRouteProps = RouteProp<RootStackParamList, screen>;
type Props = NativeStackScreenProps<RootStackParamList, screen>;
const PlaceDetails = ({ route, navigation }: Props) => {
  const { placeId } = route.params;
  const { fetchPlace, loading } = usePlaces();
  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    fetchPlace(placeId).then((place) => {
      setPlace(place),
        navigation.setOptions({ title: place?.title || "Place" });
    });
  }, [placeId]);

  if (!place && loading) return <Loader />;

  const handleShowMap = () => {
    navigation.navigate(`Map`, {
      lat: (place as Place).lat,
      lng: (place as Place).lng,
    });
  };

  return (
    <ScrollView>
      <Image style={styles.image} uri={place?.imageUri || ""} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.imageUri}</Text>
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
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" },
});
