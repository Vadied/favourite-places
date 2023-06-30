import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Place } from "../../models";
import { Colors } from "../../constants";
import { AddPlaceNavProps } from "../../screens";

import PlaceItem from "./PlaceItem";

type Props = {
  places: Place[];
};
const PlacesList = ({ places }: Props) => {
  const navigation = useNavigation<AddPlaceNavProps>();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() =>
            navigation.navigate("PlaceDetails", { placeId: item.id })
          }
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
