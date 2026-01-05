import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./homeComponentScreen/HomeHeader";
import StartWith from "./homeComponentScreen/StartWith";
import PopularTools from "./homeComponentScreen/PopularTools";
import RecommendedProjects from "./homeComponentScreen/RecommendedProjects";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <StartWith />
        <PopularTools />
        <RecommendedProjects />
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
