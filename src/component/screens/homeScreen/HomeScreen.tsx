import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import Properties from "../Properties/Properties";
import RecommendedProjects from "../Properties/RecommendedProjects";
import StartWith from "../Properties/StartWith";
import TrendingProjects from "../Properties/TrendingProjects";
import NewLaunchSection from "../Properties/NewLaunchSection";
import TopLuxury from "../Properties/TopLuxury";
import BestBudgetProject from "../Properties/BestBudgetProject";
import SeoProject from "../Properties/SeoProject";
import DreamPropertiesInGurgaon from "../Properties/DreamPropertiesInGurgaon";
import Commercial from "../Properties/Commercial";
import Feature from "../Properties/Feature";
import City from "../Properties/City";
import Affordable from "../Properties/Affordable";
import Why100Acress from "../Properties/Why100Acress";
import RealEstate from "../Properties/RealEstate";
import PopularTools from "../Properties/PopularTools";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
      removeClippedSubviews={false}
      keyboardShouldPersistTaps="handled">
        <HomeHeader />
        <StartWith />
        <RecommendedProjects />
        <TrendingProjects />
        <NewLaunchSection />
        <TopLuxury />
        <BestBudgetProject />
        <SeoProject /> 
        <DreamPropertiesInGurgaon /> 
        <Commercial />
        <Feature /> 
        <City /> 
        <Affordable />
        <RealEstate />
        <Why100Acress /> 
        {/* <PopularTools /> */}
        {/* <Properties /> */}
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
