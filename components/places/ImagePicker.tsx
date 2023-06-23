import { useState } from "react";
import { Text, Alert, View, Image, StyleSheet } from "react-native";
import {
  useCameraPermissions,
  PermissionStatus,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import { Colors } from "../../constants";

import { OutlinedButton } from "../ui";

type Props = {
  onChange(image: string): void;
};
const ImagePicker = ({ onChange }: Props) => {
  const [permissions, requestPermissions] = useCameraPermissions();
  const [image, setImage] = useState("");

  const verifyPermissions = async () => {
    if (permissions?.status === PermissionStatus.UNDETERMINED) {
      const { granted } = await requestPermissions();
      return granted;
    }

    if (permissions?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const openCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      if (result.canceled) return;

      setImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!image && <Text>No image taken yet</Text>}
        {image && <Image style={styles.image} source={{ uri: image }} />}
      </View>
      <OutlinedButton icon="camera" onPress={openCamera}>
        Open Camera
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});
