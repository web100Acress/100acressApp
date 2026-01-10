import React from "react";
import { TouchableOpacity, View, StyleSheet, } from "react-native";

const PlusButton = ({ children = null, onPress = () => {} }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "#ff2d55",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ffffff",
  },
});
