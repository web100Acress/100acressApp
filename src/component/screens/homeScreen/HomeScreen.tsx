import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import StartWith from "../Properties/StartWith";
import PopularTools from "../Properties/PopularTools";
import RecommendedProjects from "../Properties/RecommendedProjects";
import TrendingProjects from "../Properties/TrendingProjects";
import NewLaunchSection from "../Properties/NewLaunchSection";
import TopLuxury from "../Properties/TopLuxury";
import BestBudgetProject from "../Properties/BestBudgetProject"
import SeoProject from "../Properties/SeoProject";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <StartWith />
        <RecommendedProjects />
        <TrendingProjects />
        <NewLaunchSection />
        <TopLuxury />
        <BestBudgetProject />
        <SeoProject /> 
        <PopularTools />
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
