import { FlatList, StyleSheet, Text, View } from "react-native";

import { IPlace } from "../../models/place";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

type Props = {
  places: IPlace[];
};
const PlacesList = ({ places }: Props) => {
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
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  },
});