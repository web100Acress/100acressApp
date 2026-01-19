import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { getCityProjects, CityProject } from "../../../api/Services/City";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const IMAGE_HEIGHT = 180;

const City = () => {
  const [projects, setProjects] = useState<CityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getCityProjects();
      setProjects(data);
    } catch (error) {
      console.log("❌ Error fetching city projects", error);
    } finally {
      setLoading(false);
    }
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      console.log("❌ Unable to open URL")
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Heading */}
      <Text style={styles.heading}>Top Projects in Delhi</Text>

      {loading ? (
        <ActivityIndicator style={{ marginLeft: 16 }} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        >
          {projects.map((item, index) => (
            <View key={index} style={styles.card}>
              {/* Image */}
              <ImageBackground
                source={{
                  uri:
                    item.icon ||
                    "https://via.placeholder.com/400x300?text=No+Image",
                }}
                style={styles.image}
                imageStyle={{ borderRadius: 18 }}
              >
                <View style={styles.overlay} />
              </ImageBackground>

              {/* Floating Info Box */}
              <View style={styles.infoBox}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.label}
                </Text>

                <Text style={styles.location} numberOfLines={2}>
                  📍 {item.location}
                </Text>

                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => item.url && openURL(item.url)}
                >
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default City;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -18
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 12,
    color: "#111",
  },

  card: {
    width: CARD_WIDTH,
    marginRight: 16,
    paddingBottom: 60, // space for floating info box
    position: "relative",
  },

  image: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderRadius: 18,
    overflow: "hidden",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  infoBox: {
    position: "absolute",
    bottom: 0,
    left: 14,
    right: 14,
    backgroundColor: "#ffe4e4",
    borderRadius: 14,
    padding: 14,
    elevation: 6,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111",
  },

  location: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
  },

  exploreBtn: {
    backgroundColor: "#e60023",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  exploreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
