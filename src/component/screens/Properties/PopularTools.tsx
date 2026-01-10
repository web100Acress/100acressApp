import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigator";


const tools = [
  {
    label: "EMI Calculator",
    icon: "https://img.icons8.com/ios-filled/50/000000/mortgage.png",
    screen: "EmiCalculator"
  },
  {
    label: "Budget Calculator",
    icon: "https://img.icons8.com/ios-filled/50/000000/calculator.png",
    screen: "BudgetCalculator"
  },
  {
    label: "Property Insights",
    icon: "https://img.icons8.com/ios-filled/50/000000/idea.png",
    screen: "PropertyInsights"
  },
];

const PopularTools = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use popular tools</Text>
      <Text style={styles.subtitle}>Go from browsing to buying</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tools.map((item) => (
          <TouchableOpacity  key={item.label} onPress={() => {
            if(item.label === "EMI Calculator"){
              navigation.navigate(item.screen)
            }
            else if(item.label === "BudgetCalculator"){
              navigation.navigate(item.screen)
            }
          }}>
            <View style={styles.card}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.text}>{item.label}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularTools;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 24,
    backgroundColor: "#ffe5e5ff",
  },
  title: {
    fontWeight: "600",
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 4,
  },
  card: {
    width: 150,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  icon: {
    width: 32,
    height: 32,
    margin: 15,
    tintColor: "#cf4040ff",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
