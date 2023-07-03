import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { getAddress, getMapPreview } from "../../util";
import { Colors } from "../../constants";
import { ILocation } from "../../models";
import { AddPlaceNavProps, AddPlaceRouteProps } from "../../screens";

import { OutlinedButton } from "../ui";

type Props = {
  onChange(location: ILocation | null, address: string): void;
};
const LocationPicker = ({ onChange }: Props) => {
  const navigation = useNavigation<AddPlaceNavProps>();
  const route = useRoute<AddPlaceRouteProps>();
  const isFocused = useIsFocused();
  const [permissions, requestPermissions] = useForegroundPermissions();

  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(() => {
    if (!isFocused || !route?.params?.location) return;

    const mapSelected: ILocation = {
      lat: route.params.location.lat,
      lng: route.params.location.lng,
    };

    setLocation(mapSelected);
  }, [isFocused, route]);

  const handleChangeLocation = useCallback(async () => {
    if (!location) return;

    const address = await getAddress(location);
    onChange(location, address);
  }, [location, onChange]);

  useEffect(() => {
    handleChangeLocation();
  }, [location, onChange]);

  const verifyPermission = async () => {
    if (permissions?.status === PermissionStatus.UNDETERMINED) {
      const { granted } = await requestPermissions();
      return granted;
    }

    if (permissions?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const handleLocation = async () => {
    const havePermission = await verifyPermission();
    if (!havePermission) return;

    const location = await getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const handlePickOnMap = () => navigation.navigate("Map");

  return (
    <View>
      <View style={styles.mapPreview}>
        {!location && <Text>No location picked yet</Text>}
        {location && (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(location),
            }}
          />
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={handleLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handlePickOnMap}>
          Pick On
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
});
