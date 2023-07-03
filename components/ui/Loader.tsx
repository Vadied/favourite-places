import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants";

const Loader = () => {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Loading....</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
