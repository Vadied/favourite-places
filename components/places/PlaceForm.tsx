import { useState, useCallback } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

import { ILocation, Place } from "../../models";
import { Colors } from "../../constants";

import { Button } from "../ui";
import { ImagePicker, LocationPicker } from ".";

type Props = {
  onCreate(place: Place): void;
};
const PlaceForm = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImage] = useState("");
  const [location, setLocation] = useState<ILocation | null>(null);
  const [address, setAddress] = useState("");

  const handleTitle = (title: string) => {
    setTitle(title);
  };
  const handleImage = (image: string) => {
    setImage(image);
  };
  const handleLocation = useCallback(
    (location: ILocation, address: string) => {
      setLocation(location);
      setAddress(address);
    },
    [setLocation]
  );

  const handleSave = () => {
    console.log(location);
    if (!location) return;

    onCreate(new Place(title, imageUri, address, location));
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTitle}
          value={title}
        />
      </View>
      <ImagePicker onChange={handleImage} />
      <LocationPicker onChange={handleLocation} />
      <Button onPress={handleSave}>Save</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
