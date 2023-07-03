import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ILocation, RootStackParamList } from "../models";

import { IconButton } from "../components/ui";

type screen = "Map";
export type MapNavProps = NativeStackScreenProps<RootStackParamList, screen>;
export type MapRouteProps = RouteProp<RootStackParamList, screen>;
type Props = NativeStackScreenProps<RootStackParamList, screen>;
const Map = ({ navigation, route }: Props) => {
  const [location, setLocation] = useState<ILocation>({
    lat: route.params?.lat || 45.0823,
    lng: route.params?.lng || 7.6841,
  });

  const region = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelection = (e: MapPressEvent) => {
    if (route.params) return;
    
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setLocation({ lat, lng });
  };

  const saveLocation = useCallback(() => {
    if (!location)
      return Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first"
      );

    navigation.navigate("AddPlace", { location });
  }, [location, navigation]);

  useLayoutEffect(() => {
    if (route.params) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor || ""}
          onPress={saveLocation}
        />
      ),
    });
  }, [navigation, saveLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelection}
    >
      {location && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: location?.lat,
            longitude: location?.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
