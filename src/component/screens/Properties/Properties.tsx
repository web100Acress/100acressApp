import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import StartWith from "../Properties/StartWith";
import PopularTools from "../Properties/PopularTools";
import RecommendedProjects from "../Properties/RecommendedProjects";
import TrendingProjects from "../Properties/TrendingProjects";
import NewLaunchSection from "../Properties/NewLaunchSection";
import TopLuxury from "../Properties/TopLuxury";
import BestBudgetProject from "../Properties/BestBudgetProject"
import SeoProject from "../Properties/SeoProject";
import DreamPropertiesInGurgaon from "../Properties/DreamPropertiesInGurgaon";
import Commercial from "../Properties/Commercial";
import Feature from "../Properties/Feature";
import City from "../Properties/City";
import Affordable from "../Properties/Affordable";
import RealEstate from "../Properties/RealEstate";
import Why100Acress from "../Properties/Why100Acress";

const Properties = () => {
  return (
    <View style={styles.container}>
        <ScrollView>
        <StartWith />
        <RecommendedProjects />
        {/* <TrendingProjects /> */}
        {/* <NewLaunchSection /> */}
        {/* <TopLuxury /> */}
        {/* <BestBudgetProject /> */}
        {/* <SeoProject />  */}
        {/* <DreamPropertiesInGurgaon />  */}
        {/* <Commercial /> */}
        {/* <Feature />  */}
        {/* <City />  */}
        {/* <Affordable /> */}
        {/* <RealEstate /> */}
        {/* <Why100Acress />  */}
        {/* <PopularTools /> */}
        </ScrollView>
    </View>
  )
}

export default Properties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
  },
});

