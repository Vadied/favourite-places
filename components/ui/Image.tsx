import React from "react";
import {
  Image as ImageNative,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "../../constants";

type Props = {
  uri: string;
  style: StyleProp<ImageStyle>;
};
const Image = ({ style, uri }: Props) => {
  if (!uri) return <View style={[style, styles.image]}></View>;
  
  return <ImageNative source={{ uri }} style={style} />;
};

export default Image;

const styles = StyleSheet.create({
  image: { backgroundColor: Colors.primary100 },
});
