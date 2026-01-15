import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type Project = {
  id: string;
  title: string;
  bhk: string;
  location: string;
  price: string;
  image: string;
  featured: boolean;
};


/* -------------------- DATA -------------------- */
const PROJECTS: Project[]= [
  {
    id: "1",
    title: "Bricks Marvella",
    bhk: "2, 3, 4 BHK Apartment",
    location: "Tellapur, Hyderabad",
    price: "₹ 1.33 - 2.65 Cr",
    image:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
    featured: true,
  },
  {
    id: "2",
    title: "Skyline Heights",
    bhk: "2, 3 BHK Apartment",
    location: "Gachibowli, Hyderabad",
    price: "₹ 98 L - 1.8 Cr",
    image:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    featured: true,
  },
  {
    id: "3",
    title: "Bricks Marvella",
    bhk: "2, 3, 4 BHK Apartment",
    location: "Tellapur, Hyderabad",
    price: "₹ 1.33 - 2.65 Cr",
    image:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
    featured: true,
  },
];

/* -------------------- MAIN -------------------- */
export default function TopLuxury() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Luxury Apartments </Text>
    
      <FlatList
      data={PROJECTS}
      horizontal
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <ProjectCard item={item} />}
      />
    </View>
  );
}

/* -------------------- CARD -------------------- */
const ProjectCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* TOP IMAGE */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* FEATURED */}
      {item.featured && (
        <View style={styles.featuredTag}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}

      {/* INFO CARD */}
      <View style={styles.infoWrapper}>
        {/* CIRCULAR IMAGE */}
        <View style={styles.circleWrapper}>
          <Image source={{ uri: item.image }} style={styles.circleImage} />
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.bhk}>{item.bhk}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 16,
  },
  heading: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2c3d",
  },
  card: {
    width: width * 0.75,
    height: 420,
    borderRadius: 24,
    backgroundColor: "#fff",
    marginRight: 16,
    overflow: "hidden",
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  featuredTag: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#7E2EFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  featuredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoWrapper: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: "#ffe5e5ff",
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 6,
  },
  circleWrapper: {
    position: "absolute",
    top: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  circleImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2c3d",
    marginTop: 8,
    textAlign: "center",
  },
  bhk: {
    fontSize: 13,
    color: "#7d8da6",
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: "#7d8da6",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2c3d",
    marginTop: 10,
  },
});
