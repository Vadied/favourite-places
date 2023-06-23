import React, { ReactNode } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants";

type Props = {
  onPress(): void;
  children: ReactNode;
};
const Button = ({ onPress, children }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: { textAlign: "center", fontSize: 16, color: Colors.primary50 },
});
