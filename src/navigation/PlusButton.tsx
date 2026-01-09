import React from "react";
import { TouchableOpacity, View, StyleSheet, } from "react-native";

const PlusButton = ({ children, onPress }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  container: {
    top: -20, // lifts the button
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: -10, 
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "#ff2d55",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#fff",
    // paddingBottom: -10,
    // elevation: 5,
  },
});
