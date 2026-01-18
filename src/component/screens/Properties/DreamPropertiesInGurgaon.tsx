import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = 230;

const projects = [
  {
    title: "Residential Projects",
    route: "Residential",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/7a536a4b-51f5-4785-97d4-749e9ac68470.webp",
    description: "Luxury apartments and homes in prime locations",
    badge: "Popular",
  },
  {
    title: "Commercial Projects",
    route: "Commercial",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/f54d86d9-45dc-437d-9fae-d0d01d65205e.webp",
    description: "Premium office spaces and retail properties",
    badge: "Hot",
  },
  {
    title: "SCO Plots",
    route: "ScoPlots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/2f7b73d1-379e-4db0-bc17-7ea668165e27.webp",
    description: "Shop-cum-office plots for business growth",
    badge: "New",
  },
  {
    title: "Builder & Independent Floor",
    route: "IndependentFloors",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/28b918b3-0393-471a-b5ab-75af2633a501.webp",
    description: "Independent floors and builder floors",
    badge: "Featured",
  },
  {
    title: "Plots In Gurugram",
    route: "Plots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/93756186-da48-4385-95a9-63fdeaa831ec.webp",
    description: "Investment-ready plots in prime locations",
    badge: "Best Value",
  },
  {
    title: "Luxury Villas",
    route: "Villas",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/59f64851-2928-4da6-b754-9f4dd39b14fa.webp",
    description: "Ultra-luxury villas with world-class amenities",
    badge: "Premium",
  },
  {
    title: "Industrial Plots",
    route: "IndustrialPlots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/c69f77ee-92b2-4480-8cb4-b15135e7a161.webp",
    description: "Industrial plots for manufacturing and warehousing",
    badge: "Investment",
  },
];

const DreamPropertiesInGurgaon: React.FC = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const renderItem = ({ item, index }: any) => {
    const isActive = activeIndex === index;

    return (
      <Pressable
        style={styles.card}
        onPressIn={() => setActiveIndex(index)}
        onPressOut={() => setActiveIndex(null)}
        onPress={() => navigation.navigate(item.route as never)}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.image}
          imageStyle={{ borderRadius: 20 }}
        >
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>

          {/* Dark Overlay */}
          <View style={styles.overlay} />

          {/* TITLE (hide on hover) */}
          {!isActive && (
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}

          {/* DESCRIPTION (show on hover) */}
          {isActive && (
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <Text style={styles.brand}>Dream</Text> Properties In The Heart of{" "}
        <Text style={styles.brand}>Gurgaon</Text>
      </Text>

      <FlatList
        data={projects}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DreamPropertiesInGurgaon;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
  },
  brand: {
    color: "#e53e3e",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e53e3e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  titleBox: {
    backgroundColor: "rgba(234, 196, 196, 0.6)",
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  descriptionBox: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(234, 196, 196, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 18,
  },
});
