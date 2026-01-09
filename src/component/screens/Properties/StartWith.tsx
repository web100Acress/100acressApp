import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Linking } from "react-native";

const { width } = Dimensions.get("window");

const actions = [
  { label: "Buy", icon: "https://img.icons8.com/ios-filled/50/2563EB/home.png"},
  { label: "Rent", icon: "https://img.icons8.com/ios-filled/50/2563EB/key.png" },
  { label: "100shorts", icon: "https://img.icons8.com/ios-filled/50/2563EB/video.png", url:"https://www.youtube.com/@100Acress/shorts" },
  { label: "Insights", icon: "https://img.icons8.com/ios-filled/50/2563EB/idea.png" },
];

const StartWith = () => {
  return (
    <>
      <Text style={styles.title}>Get started with</Text>
      <Text style={styles.subtitle}>
        Explore real estate options in top cities
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {actions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}
          onPress={() => Linking.openURL(item.url ? item.url: "Somthing went wrong")}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.text}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default StartWith;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 30,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginHorizontal: 16,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: (width - 64) / 4,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#cf4040ff",
  },
  text: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },
});
