import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import {
  getScoplotProjects,
  ScoplotProject,
} from "../../../api/Services/SeoPlots";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 260;

const SeoProject: React.FC = () => {
  const [projects, setProjects] = useState<ScoplotProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getScoplotProjects();
      setProjects(data);
    } catch (error) {
      console.log("❌ API Error 👉", error);
      Alert.alert("Error", "Unable to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open link")
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>SCO Projects in Gurugram</Text>

      {loading ? (
        <Text style={{ marginLeft: 16 }}>Loading projects...</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {projects.length > 0 ? (
            projects.map((item, index) => (
              <View key={index} style={styles.card}>
                <ImageBackground
                  source={{
                    uri:
                      item.icon ||
                      "https://via.placeholder.com/400x300?text=No+Image",
                  }}
                  style={styles.image}
                  imageStyle={{ borderRadius: 18 }}
                >
                  {/* Dark Overlay */}
                  <View style={styles.overlay} />

                  {/* Info Box */}
                  <View style={styles.infoBox}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.label}
                    </Text>

                    <Text style={styles.location} numberOfLines={2}>
                      📍 {item.location}
                    </Text>

                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        style={styles.exploreBtn}
                        onPress={() => item.url && openURL(item.url)}
                      >
                        <Text style={styles.exploreText}>Explore</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))
          ) : (
            <Text style={{ marginLeft: 16, marginTop: 20 }}>
              No projects found
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SeoProject;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 16,
    borderRadius: 18,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  infoBox: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 14,
    padding: 12,
  },
  price: {
    color: "#e60023",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#e60023",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  whatsappBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e9fff1",
    alignItems: "center",
    justifyContent: "center",
  },
});
