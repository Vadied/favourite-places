import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Place } from "../../models";
import { Colors } from "../../constants";
import { Image } from "../ui";

type Props = {
  place: Place;
  onSelect(event: GestureResponderEvent): void;
};
const PlaceItem = ({ place, onSelect }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} uri={place.imageUri || ""} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pressed: { opacity: 0.9 },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: { flex: 2, padding: 12 },
  title: { fontWeight: "bold", fontSize: 18, color: Colors.gray700 },
  address: {},
});
