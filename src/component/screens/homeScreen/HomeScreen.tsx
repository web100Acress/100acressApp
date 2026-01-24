import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import Properties from "../Properties/Properties";
import Banner from "./Banner";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
      removeClippedSubviews={false}
      keyboardShouldPersistTaps="handled">
        <Banner />
        {/* <HomeHeader /> */}
        <Properties />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
  },
});
