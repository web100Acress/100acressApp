import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import {
  getBestBudgetProject,
  BestBudgetProject,
} from "../../../api/Services/BestBudget";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.72;

const BestBudgetCarousel: React.FC = () => {
  const [projects, setProjects] = useState<BestBudgetProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getBestBudgetProject();
      setProjects(data);
    } catch (error) {
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
      <Text style={styles.heading}>Best Budget Projects in Gurgaon</Text>

      {loading ? (
        <Text style={{ marginLeft: 16 }}>Loading projects...</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <View key={index} style={styles.card}>
                {/* Image */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri:
                        project.icon ||
                        "https://via.placeholder.com/400x300?text=No+Image",
                    }}
                    style={styles.image}
                  />
                </View>

                {/* Content */}
                <View style={styles.content}>
                  <Text style={styles.title} numberOfLines={1}>
                    {project.label}
                  </Text>

                  <Text style={styles.location} numberOfLines={2}>
                    📍 {project.location}
                  </Text>

                  {/* Buttons */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.exploreBtn}
                      onPress={() => openURL(project.url)}
                    >
                      <Text style={styles.exploreText}>Explore</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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

export default BestBudgetCarousel;

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
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 190,
  },
  priceBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceText: {
    color: "#e60023",
    fontWeight: "700",
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#e60023",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "700",
  },
  whatsappBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e9fff1",
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappText: {
    fontSize: 20,
  },
});
