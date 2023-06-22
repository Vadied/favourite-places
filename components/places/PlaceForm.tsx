import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <View style={styles.camera}>
        <ImagePicker />
      </View>
    </View>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    flex: 1,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 35,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  camera: { flex: 1 },
});
