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

const CARD_HEIGHT = 130;
const TWO_COL_WIDTH = (width - 48) / 2;
const THREE_COL_WIDTH = (width - 56) / 3;

const projects = [
  {
    title: "Residential Projects",
    route: "Residential",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/7a536a4b-51f5-4785-97d4-749e9ac68470.webp",
    description: "Luxury apartments and homes",
    badge: "Popular",
  },
  {
    title: "Commercial Projects",
    route: "Commercial",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/f54d86d9-45dc-437d-9fae-d0d01d65205e.webp",
    description: "Office & retail spaces",
    badge: "Hot",
  },
  {
    title: "SCO Plots",
    route: "ScoPlots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/2f7b73d1-379e-4db0-bc17-7ea668165e27.webp",
    description: "Shop cum office plots",
    badge: "New",
  },
  {
    title: "Builder Floors",
    route: "IndependentFloors",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/28b918b3-0393-471a-b5ab-75af2633a501.webp",
    description: "Independent builder floors",
    badge: "Featured",
  },
  {
    title: "Plots In Gurugram",
    route: "Plots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/93756186-da48-4385-95a9-63fdeaa831ec.webp",
    description: "Investment plots",
    badge: "Best Value",
  },
  {
    title: "Luxury Villas",
    route: "Villas",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/59f64851-2928-4da6-b754-9f4dd39b14fa.webp",
    description: "Ultra luxury villas",
    badge: "Premium",
  },
  {
    title: "Industrial Plots",
    route: "IndustrialPlots",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/c69f77ee-92b2-4480-8cb4-b15135e7a161.webp",
    description: "Warehousing & factories",
    badge: "Investment",
  },
];

/* 🔁 2–3–2–3 pattern */
const buildRows = (data: any[]) => {
  const rows = [];
  let i = 0;
  let two = true;

  while (i < data.length) {
    const count = two ? 2 : 3;
    rows.push(data.slice(i, i + count));
    i += count;
    two = !two;
  }
  return rows;
};

const DreamPropertiesInGurgaon = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const rows = buildRows(projects);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <Text style={styles.brand}>Dream</Text> Properties In{" "}
        <Text style={styles.brand}>Gurgaon</Text>
      </Text>

      <FlatList
        data={rows}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((project: any, index: number) => {
              const isActive = activeIndex === `${project.title}-${index}`;
              const isTwo = item.length === 2;

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.card,
                    {
                      width: isTwo ? TWO_COL_WIDTH : THREE_COL_WIDTH,
                      height: CARD_HEIGHT,
                    },
                  ]}
                  onPressIn={() =>
                    setActiveIndex(`${project.title}-${index}`)
                  }
                  onPressOut={() => setActiveIndex(null)}
                  onPress={() =>
                    navigation.navigate(project.route as never)
                  }
                >
                  <ImageBackground
                    source={{ uri: project.image }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 20 }}
                  >
                    {/* <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {project.badge}
                      </Text>
                    </View> */}

                    <View style={styles.overlay} />

                    {!isActive && (
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>
                          {project.title}
                        </Text>
                      </View>
                    )}

                    {isActive && (
                      <View style={styles.descriptionBox}>
                        <Text style={styles.description}>
                          {project.description}
                        </Text>
                      </View>
                    )}
                  </ImageBackground>
                </Pressable>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

export default DreamPropertiesInGurgaon;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
    flex: 1,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
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
    // backgroundColor: "rgba(255, 244, 244, 0.6)",
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
    backgroundColor: "rgba(234,196,196,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
