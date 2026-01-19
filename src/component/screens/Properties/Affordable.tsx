import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  getAffordableProjects,
  AffordableProject,
} from "../../../api/Services/Affordable";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

const Affordable = () => {
  const [projects, setProjects] = useState<AffordableProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAffordableProjects();
      setProjects(data);
    } catch (err) {
      console.log("❌ Affordable API Error", err);
    } finally {
      setLoading(false);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() =>
      console.log("❌ Unable to open URL")
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Affordable Homes in Gurgaon</Text>

      {loading ? (
        <ActivityIndicator style={{ marginLeft: 16 }} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {projects.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{
                  uri:
                    item.icon ||
                    "https://via.placeholder.com/300x200?text=No+Image",
                }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.label}
                </Text>

                <Text style={styles.location} numberOfLines={2}>
                  📍 {item.location}
                </Text>

                {/* Explore Button */}
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => item.url && openLink(item.url)}
                  activeOpacity={0.8}
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

export default Affordable;

const styles = StyleSheet.create({
  container: {
   marginTop: -15
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 12,
    color: "#111",
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 16,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#eee",
  },

  info: {
    padding: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  location: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },

  exploreBtn: {
    marginTop: 10,
    backgroundColor: "#e60023",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  exploreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});
